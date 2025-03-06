import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { TestGeneratorService } from '../services/test-generator.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-generator',
  standalone: true,
  templateUrl: './test-generator.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./test-generator.component.css']
})

export class TestGeneratorComponent implements OnInit {
  isLoading: boolean = false;
  testForm: FormGroup;
  testResults: any = null;
  errorMessage: string = '';
  selectedFile: File | null = null; // Allow only one ZIP file

  constructor(
    private fb: FormBuilder,
    private testService: TestGeneratorService
  ) {
    this.testForm = this.fb.group({
      repoUrl: ['', [Validators.required, this.githubUrlValidator]],
      testType: ['unit', Validators.required]
    });
  }

  ngOnInit(): void {}

  /**
   * Custom Validator for GitHub Repository URLs
   */
  githubUrlValidator(control: AbstractControl): ValidationErrors | null {
    const githubRegex = /^https:\/\/github\.com\/[\w-]+\/[\w-]+(\.git)?$/;
    return control.value && !githubRegex.test(control.value) ? { invalidGithubUrl: true } : null;
  }

  /**
   * Handles file selection for ZIP uploads
   */
  onFileSelect(event: any): void {
    const file = event.target.files[0];

    if (!file) {
      this.selectedFile = null;
      this.errorMessage = 'No file selected. Please upload a ZIP file.';
      return;
    }

    if (file.type !== 'application/zip' && !file.name.endsWith('.zip')) {
      this.selectedFile = null;
      this.errorMessage = 'Invalid file type. Please upload a ZIP file.';
      return;
    }

    this.selectedFile = file;
    this.errorMessage = ''; // Clear error if a valid file is selected
  }

  /**
   * Submits the form to backend (handles both GitHub URL & ZIP file)
   */
  async onSubmit(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    this.testResults = null;

    if (this.testForm.invalid && !this.selectedFile) {
      this.errorMessage = 'Please provide a valid GitHub repository URL or upload a ZIP file.';
      this.isLoading = false;
      return;
    }

    try {
      let response;
      if (this.selectedFile) {
        // Handle ZIP file upload
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        response = await firstValueFrom(this.testService.uploadZip(formData));
      } else {
        // Handle GitHub repo URL submission
        response = await firstValueFrom(
          this.testService.fetchFromGitHub(this.testForm.value.repoUrl)
        );
      }

      this.testResults = response;
      console.log('✅ Test cases received:', response);
    } catch (error) {
      console.error('❌ Error processing request:', error);
      this.errorMessage = 'Failed to process. Please check the input and try again.';
    } finally {
      this.isLoading = false;
    }
  }

  resetForm(): void {
    this.testForm.reset({
      repoUrl: '',
      testType: 'unit'
    });
    this.selectedFile = null;
    this.testResults = null;
    this.errorMessage = '';
  }
}

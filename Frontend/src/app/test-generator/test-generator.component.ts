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
  selectedFile: File | null = null;
  isFileUploadDisabled: boolean = false;
  isRepoUrlDisabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    private testService: TestGeneratorService
  ) {
    this.testForm = this.fb.group({
      repoUrl: ['', [Validators.required, this.githubUrlValidator]]
    });

    // Disable file upload when repo URL is entered
    this.testForm.get('repoUrl')?.valueChanges.subscribe(value => {
      if (value) {
        this.isFileUploadDisabled = true; // Disable file upload
        this.selectedFile = null; // Clear selected file
      } else {
        this.isFileUploadDisabled = false; // Enable file upload
      }
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

    if (!file.name.endsWith('.zip')) {
      this.selectedFile = null;
      this.errorMessage = 'Invalid file type. Please upload a ZIP file.';
      return;
    }

    this.selectedFile = file;
    this.errorMessage = ''; // Clear error if a valid file is selected
    this.isRepoUrlDisabled = true; // Disable GitHub URL input
    this.testForm.get('repoUrl')?.disable();
  }

  /**
   * Removes the selected file and re-enables the GitHub URL input
   */
  removeFile(): void {
    this.selectedFile = null;
    this.isRepoUrlDisabled = false;
    this.testForm.get('repoUrl')?.enable(); // Enable GitHub URL input
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
      repoUrl: ''
    });
    this.selectedFile = null;
    this.testResults = null;
    this.errorMessage = '';
    this.isRepoUrlDisabled = false;
    this.isFileUploadDisabled = false;
    this.testForm.get('repoUrl')?.enable(); // Re-enable GitHub URL input
  }
}

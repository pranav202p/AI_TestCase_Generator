import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestGeneratorService } from '../services/test-generator.service';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-test-generator',
  templateUrl: './test-generator.component.html',
  imports: [CommonModule],  
  styleUrls: ['./test-generator.component.css']
})
export class TestGeneratorComponent {
  isLoading: boolean = false; 
  testForm: FormGroup;
  testResults: any = null;
  errorMessage: string = '';
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private testService: TestGeneratorService
  ) {
    this.testForm = this.fb.group({
      repoUrl: ['', [Validators.pattern(/^https:\/\/github\.com\/.*$/)]],
      testType: ['unit', Validators.required]
    });
  }
  onFileSelect(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }
  
  onSubmit(): void {
    if (this.testForm.invalid && this.selectedFiles.length === 0) {
      this.errorMessage = 'Please provide either a GitHub repository URL or upload Java files';
      return;
    }

    this.errorMessage = '';
    this.testResults = null;

    if (this.testForm.value.repoUrl) {
      // Call the backend API to fetch and parse the repository
      this.testService.fetchFromGitHub(this.testForm.value.repoUrl).subscribe(
        (response) => {
          console.log('Test cases received:', response);
          this.testResults = response;
        },
        (error) => {
          console.error('Error fetching repository:', error);
          this.errorMessage = 'Failed to process repository.';
        }
      );
    } else {
      this.errorMessage = 'Invalid repository URL.';
    }
  }

  resetForm(): void {
    this.testForm.reset({
      repoUrl: '',
      testType: 'unit'
    });
    this.selectedFiles = [];
    this.testResults = null;
    this.errorMessage = '';
  }
}

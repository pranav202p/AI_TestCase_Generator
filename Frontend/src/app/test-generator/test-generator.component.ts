import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestGeneratorService } from '../services/test-generator.service';

@Component({
  selector: 'app-test-generator',
  templateUrl: './test-generator.component.html',
  styleUrls: ['./test-generator.component.css']
})
export class TestGeneratorComponent {
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

  onSubmit(): void {
    if (this.testForm.invalid && this.selectedFiles.length === 0) {
      this.errorMessage = 'Please provide either a GitHub repository URL or upload Java files';
      return;
    }

    this.errorMessage = '';
    this.testResults = null;

    // Simulating test generation instead of making an API call
    this.testResults = this.testService.generateTests(new FormData());
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

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestGeneratorService {
  constructor() {}

  generateTests(formData: FormData) {
    // For now, return mock data instead of making an HTTP request
    return {
      message: "Test cases generated successfully!",
      tests: [
        { name: "SampleTest1", status: "Success" },
        { name: "SampleTest2", status: "Success" }
      ]
    };
  }
}

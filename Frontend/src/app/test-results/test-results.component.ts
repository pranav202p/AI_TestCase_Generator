// test-results/test-results.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent {
  @Input() results: any;
  
  constructor() {}
  
  downloadTest(fileName: string, content: string): void {
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  
  downloadAllTests(): void {
    // Create a zip file with all tests
    // This would require a library like JSZip
    // For now, we'll just download each test individually
    if (this.results && this.results.tests) {
      this.results.tests.forEach((test: any) => {
        this.downloadTest(test.fileName, test.content);
      });
    }
  }
}
import { Component } from '@angular/core';
import { TestGeneratorComponent } from './test-generator/test-generator.component';

@Component({
  selector: 'app-root',
  standalone: true,  // ✅ Standalone component
  imports: [TestGeneratorComponent],  // ✅ Import the component
  template: `
    <app-test-generator></app-test-generator>
  `,
  styles: []
})
export class AppComponent {
  title = 'test-generator';
}

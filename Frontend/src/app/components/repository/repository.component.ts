import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // ✅ Import required modules
})
export class RepositoryComponent {
  repoUrl: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  submitRepo() {
    if (this.repoUrl) {
      this.http.post('http://localhost:3000/submit-repo', { url: this.repoUrl }).subscribe(
        (response: any) => {
          this.message = `Repository ${this.repoUrl} submitted successfully!`;
        },
        (error) => {
          this.message = 'Failed to submit repository. Please try again.';
        }
      );
    }
  }
}

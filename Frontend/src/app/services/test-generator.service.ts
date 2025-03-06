import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestGeneratorService {
  private githubUrl = 'http://localhost:8080/api/fetch-repo';
  private zipUploadUrl = 'http://localhost:8080/api/upload-zip';

  constructor(private http: HttpClient) {}

  /**
   * Fetches test cases from a GitHub repository URL
   */
  fetchFromGitHub(repoUrl: string): Observable<any> {
    return this.http.post(this.githubUrl, { repoUrl });
  }

  /**
   * Uploads a ZIP file for test case generation
   */
  uploadZip(fileData: FormData): Observable<any> {
    return this.http.post(this.zipUploadUrl, fileData);
  }
}

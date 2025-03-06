import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestGeneratorService {
  private backendUrl = 'http://localhost:8080/api/fetch-repo';

  constructor(private http: HttpClient) {}

  fetchFromGitHub(repoUrl: string): Observable<any> {
    return this.http.post(this.backendUrl, { repoUrl });
  }
}
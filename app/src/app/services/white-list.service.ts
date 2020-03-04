import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../../shared/interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class WhiteListService {
  private readonly API_URL = "http://localhost:3030";

  constructor(private http: HttpClient) { }
  addFile(file: File): Observable<ApiResponse> {
    const fileData = new FormData();
    fileData.append("file", file);
    return this.http.post<ApiResponse>(`${this.API_URL}/api/white-list`, fileData);
  }
  getFiles(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.API_URL}/api/white-list`);
  }
}

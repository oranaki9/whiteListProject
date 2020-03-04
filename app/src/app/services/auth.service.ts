import { Observable } from 'rxjs';
import { UserLogin } from './../../../../shared/interfaces/users';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../../shared/interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = "http://localhost:3030"; // TODO : inject it
  constructor(private http: HttpClient) { }
  login(user: UserLogin): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URL}/log-in`, { user });
  }
  saveTokenInLocalStorage(token: string) {
    localStorage.setItem("userToken", token);
  }
  get token(): string {
    return localStorage.getItem("userToken");
  }
  getUserRole(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.API_URL}/user-access`);
  }
  logOut(): void {
    this.clearStorage();
  }
  clearStorage(): void {
    localStorage.removeItem("userToken")
  }
  isAuth(): boolean {
    return this.token ? true : false;
  }
}

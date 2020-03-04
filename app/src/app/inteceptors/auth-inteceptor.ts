import { AuthService } from './../services/auth.service';
import { NextFunction } from 'connect';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthInteceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.token;
    const authRequest = request.clone({
      headers: request.headers.set("Authorization", `Bearer ${token}`)
    });


    return next.handle(authRequest);
  }
}

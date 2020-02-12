import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('auth-token');

    let clone: HttpRequest<any>;
    if (token) {
      clone = request.clone({
        setHeaders: {
          "Accept": `application/json`,
          "Authorization": `Bearer ${token}`
        }
      });
    } else {
      clone = request;
    }
    return next.handle(clone)
  }
}

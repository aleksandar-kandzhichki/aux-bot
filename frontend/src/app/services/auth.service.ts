import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(password: string) {
    return this.http.post<{ token: string }>(`/api/users/login`, { password }).pipe(tap(r => sessionStorage.setItem("auth-token", r.token)))
  }
}

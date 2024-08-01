import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiUrl;

  private loginUrl = `${this.url}/auth/login`;
  private logoutUrl = `${this.url}/auth/logout`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password }).pipe(
      tap((response) => {
        if (response.status === 'success') {
          console.log(response);

          localStorage.setItem('email', response.data.email);
          localStorage.setItem('role', response.data.role);
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  isTeacherLoggedIn(): boolean {
    return this.isLoggedIn() && localStorage.getItem('role') === 'TEACHER';
  }

  logout(): Observable<any> {
    return this.http.get<any>(this.logoutUrl).pipe(
      tap((response) => {
        if (response.status === 'success') {
          localStorage.clear();
        }
      })
    );
  }
}

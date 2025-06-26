import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }, { 
      withCredentials: true 
    }).pipe(
      tap((res: any) => {
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        this.router.navigate(['/table']);
      })
    );
  }

  // ---- ADD THIS FOR SIGNUP ----
  register(data: {
    username: string;
    email: string;
    password: string;
    role?: string;
    assigned_manager_id?: number;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, { withCredentials: true });
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    HttpClientModule  // ✅ ADD THIS
  ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSignup() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const body = {
      username: this.name,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:3000/api/auth/register', body, { withCredentials: true }).subscribe({
      next: () => {
        alert('Signup successful');
        this.router.navigate(['/login']);
      },
      error: err => {
        alert(err.error?.error || 'Signup failed');
      }
    });
  }
}

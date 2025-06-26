import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  role: 'employee' | 'manager' | 'admin' = 'employee'; // default role
  assigned_manager_id?: number;
  errorMessage = '';
  successMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  signup(event: Event) {
    event.preventDefault();
    this.errorMessage = '';
    this.successMessage = '';

    this.auth.register({
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      assigned_manager_id: this.assigned_manager_id
    }).subscribe({
      next: (res) => {
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Registration failed';
      }
    });
  }
}

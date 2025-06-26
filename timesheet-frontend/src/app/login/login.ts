import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  login(event: Event) {
    event.preventDefault();
    this.errorMessage = '';
    console.log('Login attempted with:', this.email, this.password); // Debug log

    this.auth.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response); // Debug log
        this.router.navigate(['/table']); // Navigate to the table page on successful login
      },
      error: (err) => {
        console.error('Login error:', err); // Debug log
        this.errorMessage = err.error?.error || 'Invalid credentials';
      }
    });
  }
}

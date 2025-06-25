// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-signup',
//   imports: [RouterModule],
//   templateUrl: './signup.html',
//   styleUrl: './signup.scss'
// })
// export class SignupComponent {
// }


import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Add this

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSignup() {
    const body = { username: this.name, email: this.email, password: this.password };
    this.http.post('http://localhost:3000/api/auth/register', body, { withCredentials: true })
      .subscribe({
        next: () => {
          alert('Signup successful');
          this.router.navigate(['/login']);
        },
        error: err => alert(err.error?.error || 'Signup failed')
      });
  }
}
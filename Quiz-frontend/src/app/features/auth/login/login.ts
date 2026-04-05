import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  passwordVisible: boolean = false;
  email = '';
  password = '';

  private http = inject(HttpClient);
  private router = inject(Router);

  togglePassword() { 
    this.passwordVisible = !this.passwordVisible; 
  }

  onLogin() {
    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }
    
    this.http.post('http://localhost:8080/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        console.log('Login success:', res);
        localStorage.setItem('token', res?.token || 'test-token');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Login failed: ' + (err.error?.error || err.message));
      }
    });
  }
}

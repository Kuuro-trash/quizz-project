import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  passwordVisible: boolean = false;
  username = '';
  email = '';
  password = '';

  private http = inject(HttpClient);
  private router = inject(Router);

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  onRegister() {
    if (!this.username || !this.email || !this.password) {
      alert('Please fill out all fields');
      return;
    }
    
    this.http.post('http://localhost:8080/auth/register', {
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        console.log('Register success:', res);
        alert('Welcome ' + this.username + '! Starting your Journey...');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Register error:', err);
        alert('Registration failed: ' + (err.error?.error || err.message));
      }
    });
  }
}

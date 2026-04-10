import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router'; // Import Router
import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, CommonModule],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css'
})
export class AuthLayout {
  constructor(private router: Router) {}

  // Hàm này tự động trả về type dựa trên đường dẫn URL
  get navbarType(): 'auth-signin' | 'auth-signup' | 'home' {
    const url = this.router.url;
    if (url.includes('/login')) return 'auth-signin';
    if (url.includes('/register')) return 'auth-signup';
    return 'home';
  }
}
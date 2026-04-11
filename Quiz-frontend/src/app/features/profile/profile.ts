import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  private http = inject(HttpClient);

  user = {
    id: '',
    name: 'Guest Player',
    title: 'Master of Logic & Digital Lore (Chưa có tính năng Edit Profile)',
    games: 0,
    points: 0,
    rank: 0,
    avgScore: 0
  };

  historySessions: any[] = [];

  createdQuizzes: any[] = [];

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        this.user.name = parsed.username || parsed.name || 'Alex Rivera';
        this.user.id = parsed.id || '';
      } catch(e) {}
    }

    this.fetchMyQuizzes();
  }

  fetchMyQuizzes() {
    this.http.get<any[]>('http://localhost:8080/api/quizzes').subscribe({
      next: (allQuizzes) => {
        // Nếu user.id rỗng (chưa đăng nhập chuẩn), hiện tất cả. Nếu có, hiện những cái khớp ID hoặc không có ID (quá khứ)
        const myQuizzes = allQuizzes.filter(q => 
          q.created_by || (this.user.id && q.created_by === this.user.id)
        );
        
        // Map data để hiển thị
        this.createdQuizzes = myQuizzes.map(q => ({
          id: q.id,
          title: q.title,
          image: q.cover_image || '/Space-Quiz.png',
          plays: '0 plays',
          rating: 5.0,
          category: q.level ? q.level.toUpperCase() : 'GENERAL',
          color: '#6c2bd9'
        }));
      },
      error: (err) => console.error('Failed to load quizzes', err)
    });
  }
}

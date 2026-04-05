import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  username: string = 'Alex Rivera';
  joinPin: string = '';

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user && user.user_name) {
          this.username = user.user_name;
        }
      } catch (e) {}
    }
  }

  // Mảng dữ liệu cho 4 Quiz Recommended
 quizzes = [
    {
      id: 1,
      title: 'World Geography Challenge',
      stats: '1.2k Plays • 15 Questions',
      img: '/Geography.png'
    },
    {
      id: 2,
      title: 'Arts and Music',
      stats: '850 Plays • 10 Questions',
      img: '/Arts.png'
    },
    {
      id: 3,
      title: 'Who is a millionaire?',
      stats: '3.4k Plays • 12 Questions',
      img: '/Money.png'
    },
    {
      id: 4,
      title: 'Who is smarter than the fifth grade?',
      stats: '2.1k Plays • 20 Questions',
      img: '/School.png'
    }
  ];

  getQuizImg(quiz: any): string {
    return quiz.img;
  }
}

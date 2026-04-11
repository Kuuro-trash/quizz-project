import { Component } from '@angular/core';
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
export class Dashboard {
  username: string = 'Alex Rivera';
  joinPin: string = '';

  onPinInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.joinPin = input.value;
  }

  // Mảng dữ liệu cho 4 Quiz Recommended
  quizzes = [
    {
      id: 1,
      title: 'World Geography Challenge',
      stats: '1.2k Plays • 15 Questions',
      img: '/Geography.png' // Đảm bảo đường dẫn này đúng với thư mục assets của bạn
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

  // Hàm bổ trợ nếu bạn vẫn muốn dùng logic cũ nhưng trả về ảnh theo đối tượng
  getQuizImg(quiz: any): string {
    return quiz.img;
  }
}
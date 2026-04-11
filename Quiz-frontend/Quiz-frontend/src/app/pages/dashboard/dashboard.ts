import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  quizzes = [
    { title: 'General Knowledge', questions: 10 },
    { title: 'Science Quiz', questions: 8 },
    { title: 'Technology Basics', questions: 12 },
    { title: 'Music Trivia', questions: 6 },
    { title: 'Geography Test', questions: 9 }
  ];
}

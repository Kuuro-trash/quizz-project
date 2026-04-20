import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

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
  quizzes: any[] = [];

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  async ngOnInit() {
    try {
      // Get all quizzes
      const res: any = await firstValueFrom(
        this.http.get('http://localhost:8080/api/quizzes')
      );
      
      if (res && Array.isArray(res)) {
        // Chỉ hiển thị các quiz của Admin dựa vào email (ổn định hơn username vì username có thể thay đổi)
        const adminQuizzes = res.filter(q => q.creator && q.creator.email === 'just4quiz@gmail.com');

        // Lấy tối đa 4 quiz
        this.quizzes = adminQuizzes.slice(0, 4).map(q => {
          const plays = q.plays || 0;
          return {
            id: q.id || q.ID,
            title: q.title,
            stats: `${plays} Plays - ` + (q.questions ? q.questions.length : 0) + ' Questions',
            plays: plays,
            hosts: q.hosts || 0,
            comments: q.comments || 0,
            rating: 5.0,
            img: q.cover_image && q.cover_image.startsWith('data:image') ? q.cover_image : '/Cyber.png'
          };
        });
        this.cd.detectChanges();
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu', error);
    }
  }

  onPinInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.joinPin = input.value;
  }

  getQuizImg(quiz: any): string {
    return quiz.img || '/Cyber.png';
  }
}

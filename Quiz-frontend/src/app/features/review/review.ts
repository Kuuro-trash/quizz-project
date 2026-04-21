import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review.html',
  styleUrls: ['./review.css']
})
export class Review implements OnInit {
  selectedRating = 0;
  comment = '';

  quizId = '';
  quizDetails: any = null;
  reviews: any[] = [];
  userId = '';

  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private quizService = inject(QuizService);
  private apiUrl = 'http://' + window.location.hostname + ':8080/api';

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('id') || '';
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.userId = user.ID || user.id;
      } catch (e) {}
    }

    if (this.quizId) {
      this.loadQuiz();
      this.loadReviews();
    }
  }

  loadQuiz() {
    this.quizService.getQuiz(this.quizId).subscribe({
      next: (res: any) => {
        this.quizDetails = res;
      },
      error: (err) => console.error(err)
    });
  }

  loadReviews() {
    this.http.get(this.apiUrl + '/quizzes/' + this.quizId + '/reviews').subscribe({
      next: (res: any) => {
        this.reviews = res || [];
      },
      error: (err) => console.error(err)
    });
  }

  setRating(rating: number) {
    this.selectedRating = rating;
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
 
  getEmptyStars(rating: number): number[] {
    return Array(5 - rating).fill(0);
  }

  getRatingPercentage(stars: number): number {
    if (!this.reviews || this.reviews.length === 0) return 0;
    const count = this.reviews.filter(r => r.rating === stars).length;
    return Math.round((count / this.reviews.length) * 100);
  }

  get averageRating(): number {
    if (!this.reviews || this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((a, b) => a + (b.rating || 0), 0);
    return Number((sum / this.reviews.length).toFixed(1));
  }

  submitReview() {
    if (this.selectedRating === 0) {
      alert('Please select a rating from 1 to 5 stars');
      return;
    }
    if (!this.userId) {
      alert('You must be logged in to leave a review.');
      return;
    }

    const payload = {
      quiz_id: this.quizId,
      user_id: this.userId,
      rating: this.selectedRating,
      comment: this.comment
    };

    this.http.post(this.apiUrl + '/quizzes/reviews', payload).subscribe({
      next: (res: any) => {
        alert('Review submitted successfully!');
        this.selectedRating = 0;
        this.comment = '';
        this.loadReviews();
      },
      error: (err: any) => {
        alert('Failed to submit review: ' + (err.error?.error || err.message));
      }
    });
  }
}


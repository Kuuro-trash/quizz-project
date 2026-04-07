import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Quiz {
  id: number;
  title: string;
  author: string;
  items: number;
  plays: string;
  level: string;
  image: string;
}

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './quiz-list.html',
  styleUrls: ['./quiz-list.css']
})
export class QuizList implements OnInit, OnDestroy {
  searchTerm: string = '';
  
  selectedLevels: { [key: string]: boolean } = {
    Easy: false,
    Mid: false,
    Pro: false
  };

  constructor(private router: Router) {}

  ngOnInit() {
    const savedState = sessionStorage.getItem('quizFilterState');
    if (savedState) {
      const state = JSON.parse(savedState);
      this.searchTerm = state.searchTerm || '';
      this.selectedLevels = state.selectedLevels || { Easy: false, Mid: false, Pro: false };
    }
  }

  ngOnDestroy() {
    // Chỉ giữ lại filter state nếu chuẩn bị đi vào các trang con của Quiz (chơi game hoặc xem chi tiết)
    // Nếu người dùng điều hướng sang trang khác hoàn toàn như Dashboard, Profile... thì xóa filter.
    if (!this.router.url.includes('/play/') && !this.router.url.includes('/quiz-detail')) {
      sessionStorage.removeItem('quizFilterState');
    }
  }

  saveState() {
    sessionStorage.setItem('quizFilterState', JSON.stringify({
      searchTerm: this.searchTerm,
      selectedLevels: this.selectedLevels
    }));
  }

  quizzes: Quiz[] = [
    { id: 1, title: 'World History Masters', author: 'Elena Vance', items: 15, plays: '1.2k', level: 'Mid', image: 'World.png' },
    { id: 2, title: 'Network Security', author: 'Alex Rivera', items: 10, plays: '850', level: 'Pro', image: 'Cyber.png' },
    { id: 3, title: 'Quantum Physics', author: 'Dr. Smith', items: 20, plays: '2k', level: 'Pro', image: 'Science.png' },
    { id: 4, title: 'Pop Culture 2024', author: 'Sarah J.', items: 25, plays: '5k', level: 'Easy', image: 'Music.png' },
    { id: 5, title: 'Renaissance Art', author: 'Da Vinci', items: 12, plays: '1.1k', level: 'Mid', image: 'Arts1.png' },
    { id: 6, title: 'Angular Expert', author: 'Dev Team', items: 30, plays: '8k', level: 'Pro', image: 'Tech.png' }
  ];

  get filteredQuizzes(): Quiz[] {
    return this.quizzes.filter(quiz => {
      // Filter by Search Term
      const matchesSearch = quiz.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      // Filter by Selected Levels
      const activeLevels = Object.keys(this.selectedLevels).filter(key => this.selectedLevels[key]);
      const matchesLevel = activeLevels.length === 0 || activeLevels.includes(quiz.level);

      return matchesSearch && matchesLevel;
    });
  }

  clearAll() {
    this.searchTerm = '';
    this.selectedLevels = {
      Easy: false,
      Mid: false,
      Pro: false
    };
    this.saveState();
  }
}

const fs = require('fs');
const path = require('path');

const profileDir = 'C:\\Users\\Hung\\MajorProject\\Quiz-frontend\\src\\app\\features\\profile';
if (!fs.existsSync(profileDir)) fs.mkdirSync(profileDir, {recursive: true});

fs.writeFileSync(path.join(profileDir, 'profile.css'), `/* 0. Cấu trúc tổng thể */
.profile-page { background-color: #fcf9ff; min-height: 100vh; padding: 40px 0; font-family: 'Inter', sans-serif; color: #1a1a2e; }

.profile-container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }

/* 1. Header & Profile (Chia Left-Right) */
.profile-header-card { background: white; border-radius: 24px; padding: 50px; display: flex; align-items: center; /* Căn giữa dọc */ gap: 50px; margin-bottom: 50px; box-shadow: 0 10px 40px rgba(142, 93, 250, 0.06); background: linear-gradient(135deg, #ffffff 0%, #fdfaff 100%); border: 1px solid #f0eaff; }

/* Cột trái: Avatar */
.avatar-column { flex-shrink: 0; }

.avatar-wrap { position: relative; width: 150px; height: 150px; border-radius: 50% !important; background: white; padding: 6px; border: 4px solid #8e5dfa; box-shadow: 0 8px 30px rgba(142, 93, 250, 0.25); display: flex; align-items: center; justify-content: center; }

.avatar-wrap img { width: 100%; height: 100%; border-radius: 50% !important; object-fit: cover; display: block; }

.verified-badge { position: absolute; bottom: 8px; right: 8px; background: white; color: #d92b5a; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }

/* Cột phải: Info + Stats */
.info-column { flex-grow: 1; display: flex; flex-direction: column; gap: 30px; /* Khoảng cách giữa Text và Stats */ }

.user-identity h1 { font-size: 3rem; font-weight: 800; margin: 0; color: #1a1a2e; }

.user-identity p { color: #7b7b8f; font-size: 1.15rem; margin-top: 5px; font-weight: 500; }

.stats-row { display: flex; gap: 20px; width: 100%; }

.stat-box { flex: 1; background: white; border-radius: 20px; padding: 18px 25px; display: flex; align-items: center; gap: 15px; border: 1px solid #f2f2f7; box-shadow: 0 4px 15px rgba(0,0,0,0.02); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }

.stat-box:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(142, 93, 250, 0.08); }

.stat-info .label { font-size: 0.75rem; font-weight: 700; color: #a0a0b2; margin-bottom: 4px; display: block; }
.stat-info .value { font-size: 1.4rem; font-weight: 800; color: #2d2d3f; }
.icon-box { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }

/* Colors */
.primary-bg { background: #f3edff; } .primary-color { color: #8e5dfa; }
.danger-bg { background: #ffeff3; } .danger-color { color: #d92b5a; }
.info-bg { background: #f0f1ff; } .info-color { color: #3d4aed; }
.success-bg { background: #eafaf1; } .success-color { color: #2ecc71; }

/* 2. Main Layout 70/30 */
.main-grid-layout { display: grid; grid-template-columns: 7fr 3fr; gap: 40px; margin-bottom: 50px; align-items: start; }

.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
.section-header h2 { font-size: 1.6rem; font-weight: 800; }

/* Bảng History: Mỗi hàng là 1 khối trắng riêng biệt */
.history-stack { display: flex; flex-direction: column; gap: 12px; }

.history-table-header, .history-item-row { display: grid; grid-template-columns: 3fr 1.5fr 1fr 1fr 1fr; padding: 15px 20px; align-items: center; }

.history-item-row { background: white; border-radius: 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }

.pagination-container { display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 25px; }

.page-btn { width: 36px; height: 36px; border-radius: 10px; border: 1px solid #f0eaff; background: white; color: #7b7b8f; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }

.page-btn.active { background: #8e5dfa; color: white; border-color: #8e5dfa; }

.page-btn:hover:not(.active) { background: #fdfaff; border-color: #8e5dfa; color: #8e5dfa; }

.history-item-row:hover { border-color: #e0d5ff; transform: scale(1.01); background: #fdfbff; }

.cell-flex { display: flex; align-items: center; gap: 15px; }
.quiz-mini-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
.quiz-title-name { font-weight: 700; font-size: 1.05rem; }
.text-danger-bold { color: #d92b5a; font-weight: 800; font-size: 1.15rem; }

.rank-pill { padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 700; background: #f0f0f5; display: inline-flex; align-items: center; gap: 6px; }
.rank-pill.gold { background: #fff9e6; color: #f1ad1d; }

/* 3. Quick Actions */
.sub-section-title { margin-bottom: 25px; font-size: 1.6rem; font-weight: 800; }
.actions-vertical-stack { display: flex; flex-direction: column; gap: 20px; }

.action-btn-primary { background: #8e5dfa; color: white; padding: 20px 25px; border-radius: 20px; border: none; font-weight: 700; font-size: 1.05rem; display: flex; align-items: center; gap: 15px; cursor: pointer; box-shadow: 0 12px 30px rgba(142, 93, 250, 0.3); transition: transform 0.2s; }

.action-btn-white { background: white; color: #2d2d3f; padding: 20px 25px; border-radius: 20px; border: 1px solid #f0f0f5; font-weight: 700; font-size: 1.05rem; display: flex; align-items: center; gap: 15px; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.02); transition: all 0.2s; }

.action-btn-primary:hover { transform: translateY(-3px); }
.action-btn-white:hover { border-color: #8e5dfa; background: #fdfaff; }
.chevron { margin-left: auto; color: #c0c2d3; }

/* 4. Created Quizzes Grid */
.quizzes-responsive-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 25px; }

.nav-arrows-box { display: flex; align-items: center; gap: 12px; }

.pro-quiz-card { background: white; border-radius: 26px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.04); border: 1px solid #f1f1f7; transition: all 0.3s ease; cursor: pointer; }

.pro-quiz-card:hover { transform: translateY(-10px); box-shadow: 0 15px 40px rgba(0,0,0,0.08); }

.card-img-box { position: relative; aspect-ratio: 16/9; overflow: hidden; }
.card-img-box img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.pro-quiz-card:hover .card-img-box img { transform: scale(1.05); }

.category-pill { position: absolute; top: 15px; left: 15px; color: white; font-size: 0.7rem; font-weight: 800; padding: 7px 15px; border-radius: 12px; text-transform: uppercase; z-index: 1; }

.card-body { padding: 22px; }
.card-body h3 { font-size: 1.2rem; margin: 0 0 15px 0; font-weight: 700; color: #1a1a2e; }
.card-meta { display: flex; justify-content: space-between; font-size: 0.9rem; color: #7b7b8f; font-weight: 600; }
.gold { color: #f1ad1d; }
.sm { font-size: 18px; margin-right: 4px; }

/* Create Placeholder Card (Khớp hệt card quiz) */
.create-placeholder-card { border: 2px dashed #dcd0ff; background: #fdfbff; border-radius: 26px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 15px; cursor: pointer; aspect-ratio: 16/14; /* Điều chỉnh tỉ lệ để chiều cao bằng hệt card quiz có text */ transition: all 0.3s; }

.create-placeholder-card:hover { background: #f4f0ff; border-color: #8e5dfa; transform: translateY(-5px); }
.plus-circle-icon { width: 55px; height: 55px; background: white; border-radius: 50%; box-shadow: 0 5px 15px rgba(142, 93, 250, 0.15); display: flex; align-items: center; justify-content: center; color: #8e5dfa; }
.label-text { font-weight: 700; color: #3b3b4f; }

.nav-btn { width: 40px; height: 40px; border-radius: 50%; border: none; background: #f0eaff; color: #8e5dfa; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }

.nav-btn:hover { background: #8e5dfa; color: white; }
`);

fs.writeFileSync(path.join(profileDir, 'profile.html'), `
<div class="profile-page">
  <div class="profile-container">

    <!-- 1. Header & Banner User Info (Chia 2 khung: Trái Avatar - Phải Info) -->
    <div class="profile-header-card">
      <!-- Khung trái: Avatar -->
      <div class="avatar-column">
        <div class="avatar-wrap">
          <img src="/User.png" alt="Avatar">
          <div class="verified-badge"><span class="material-icons">check_circle</span></div>
        </div>
      </div>

      <!-- Khung phải: Chữ & Thống kê -->
      <div class="info-column">
        <div class="user-identity">
          <h1>{{ user.name }}</h1>
          <p>{{ user.title }}</p>
        </div>

        <div class="stats-row">
          <div class="stat-box">
            <div class="icon-box info-bg"><span class="material-icons info-color">sports_esports</span></div>
            <div class="stat-info">
              <span class="label">GAMES</span>
              <span class="value">{{ user.games }}</span>
            </div>
          </div>

          <div class="stat-box">
            <div class="icon-box danger-bg"><span class="material-icons danger-color">diamond</span></div>
            <div class="stat-info">
              <span class="label">POINTS</span>
              <span class="value">{{ user.points | number }}</span>
            </div>
          </div>

          <div class="stat-box">
            <div class="icon-box primary-bg"><span class="material-icons primary-color">workspace_premium</span></div>
            <div class="stat-info">
              <span class="label">RANK</span>
              <span class="value">#{{ user.rank }}</span>
            </div>
          </div>

          <div class="stat-box">
            <div class="icon-box success-bg"><span class="material-icons success-color">assessment</span></div>
            <div class="stat-info">
              <span class="label">AVG SCORE</span>
              <span class="value">{{ user.avgScore }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Middle Section (Layout 70/30) -->
    <div class="main-grid-layout">
     
      <!-- Left: Game History -->
      <div class="history-column">
        <div class="section-header">
          <h2>Game History</h2>
        </div>
       
        <div class="history-stack">
          <!-- Bảng Header -->
          <div class="history-table-header">
            <span class="col-name">QUIZ NAME</span>
            <span class="col-date">DATE</span>
            <span class="col-score">SCORE</span>
            <span class="col-rank">RANK</span>
            <span class="col-players">PLAYERS</span>
          </div>

          <!-- Các hàng dữ liệu rời nhau -->
          <div class="history-item-row" *ngFor="let item of historySessions">
            <div class="col-name cell-flex">
              <div class="quiz-mini-icon" [style.color]="item.color" [style.background]="item.color + '15'">
                <span class="material-icons">{{ item.icon }}</span>
              </div>
              <span class="quiz-title-name">{{ item.name }}</span>
            </div>
            <div class="col-date">{{ item.date }}</div>
            <div class="col-score text-danger-bold">{{ item.score }}</div>
            <div class="col-rank">
              <span class="rank-pill" [class.gold]="item.rank === '1st'" [class.silver]="item.rank === '2nd'">
                <span class="material-icons sm-icon" *ngIf="item.rank === '1st'">emoji_events</span>
                {{ item.rank }}
              </span>
            </div>
            <div class="col-players">{{ item.players }}</div>
          </div>
        </div>
        <!-- Nút phân trang thêm vào đây -->
        <div class="pagination-container">
          <button class="page-btn"><span class="material-icons">chevron_left</span></button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <button class="page-btn">...</button>
          <button class="page-btn">5</button>
          <button class="page-btn"><span class="material-icons">chevron_right</span></button>
        </div>        
      </div>

      <!-- Right: Quick Actions -->
      <div class="actions-column">
        <h2 class="sub-section-title">Quick Actions</h2>
       
        <div class="actions-vertical-stack">
          <button class="action-btn-primary" routerLink="/app/profile-edit">
            <span class="material-icons">edit_square</span> Edit Profile
            <span class="material-icons chevron">chevron_right</span>
          </button>
         
          <button class="action-btn-white" routerLink="/app/create-quiz">
            <span class="material-icons info-color">add_circle_outline</span> Create Quiz
            <span class="material-icons chevron">chevron_right</span>
          </button>

          <button class="action-btn-white" routerLink="/app/leaderboard">
            <span class="material-icons primary-color">bar_chart</span> Global Leaderboard
            <span class="material-icons chevron">chevron_right</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 3. Bottom Section: My Created Quizzes -->
    <div class="created-quizzes-section">
      <div class="section-header">
        <h2>My Created Quizzes</h2>
        <div class="nav-arrows-box">
          <button class="nav-btn"><span class="material-icons">arrow_back</span></button>
          <button class="nav-btn"><span class="material-icons">arrow_forward</span></button>
        </div>
      </div>

      <div class="quizzes-responsive-grid">
        <!-- Quiz Cards - Added routerLink to quiz details -->
        <div class="pro-quiz-card" *ngFor="let quiz of createdQuizzes" [routerLink]="['/app/quiz-detail', quiz.id]">
          <div class="card-img-box">
            <div class="category-pill" [style.background]="quiz.color">{{ quiz.category }}</div>
            <img [src]="quiz.image" alt="Quiz">
          </div>
          <div class="card-body">
            <h3>{{ quiz.title }}</h3>
            <div class="card-meta">
              <span><span class="material-icons sm">play_arrow</span> {{ quiz.plays }}</span>
              <span><span class="material-icons sm gold">star</span> {{ quiz.rating }}</span>
            </div>
          </div>
        </div>

        <!-- Create New Card (Chuẩn tỉ lệ 16:9 giống các card khác) -->
        <div class="create-placeholder-card" routerLink="/app/create-quiz">
          <div class="plus-circle-icon"><span class="material-icons">add</span></div>
          <span class="label-text">Create New Quiz</span>
        </div>
      </div>
    </div>

  </div>
</div>
`);

fs.writeFileSync(path.join(profileDir, 'profile.ts'), `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {
  user = {
    name: 'Alex Rivera',
    title: 'Master of Logic & Digital Lore',
    games: 142,
    points: 42850,
    rank: 12,
    avgScore: 88
  };

  historySessions = [
    { name: 'Retro Sci-Fi Trivia', date: 'Oct 24, 2024', score: 950, rank: '1st', players: 248, icon: 'public', color: '#6c2bd9' },
    { name: 'JS Mastery Challenge', date: 'Oct 22, 2024', score: 820, rank: '4th', players: 1024, icon: 'code', color: '#3d4aed' },
    { name: 'Geography Sprint', date: 'Oct 20, 2024', score: 1100, rank: '2nd', players: 56, icon: 'terrain', color: '#d92b5a' }
  ];

  createdQuizzes = [
    { id: 1, title: 'Galactic Frontiers', image: '/Space-Quiz.png', plays: '1.2k plays', rating: 4.8, category: 'SCI-FI', color: '#6c2bd9' },
    { id: 2, title: 'Exotic Ecosystems', image: '/Nature-Quiz.png', plays: '856 plays', rating: 4.5, category: 'NATURE', color: '#d92b5a' },
    { id: 3, title: 'Python Logic Puzzles', image: '/Code-Quiz.png', plays: '3.4k plays', rating: 4.9, category: 'CODING', color: '#3d4aed' }
  ];
}
`);
console.log('Profile features applied successfully.');
const fs = require('fs');
let content = fs.readFileSync('src/app/features/quiz/quiz-detail/quiz-detail.html', 'utf8');

const correctSidebar = \
    <!-- C?T PH?I (SIDEBAR) -->
    <aside class="sidebar">
      @if (isOwner) {
        <!-- Start Game chính (Host) -->
        <button class="btn-start-gradient">
          <i class="pi pi-play"></i> START GAME
        </button>

        <!-- Quick Actions -->
        <div class="side-card quick-actions-card">
          <span class="side-label">QUICK ACTIONS</span>
          <div class="action-list">
            <button class="action-item">
              <i class="pi pi-align-left" style="color: #64748b;"></i>
              <span>Edit Quiz</span>
            </button>
            <button class="action-item" (click)="shareQuiz()">
              <i class="pi pi-share-alt" style="color: #64748b;"></i>
              <span>Share Quiz</span>
            </button>
            <button class="action-item delete">
              <i class="pi pi-trash" style="color: #64748b;"></i>
              <span>Delete Quiz</span>
            </button>
          </div>
        </div>

        <!-- Summary -->
        <div class="side-card summary-card">
          <span class="side-label">QUIZ SUMMARY</span>
          <div class="summary-content" style="margin-top: 1rem;">
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <p class="summary-text" style="font-size: 0.85rem; color: #94a3b8; margin: 0; display: flex; align-items: center;">
                <i class="pi pi-user" style="margin-right: 0.75rem; color: #7f56d9;"></i>
                <span style="flex: 1;">Author:</span> 
                <strong style="color: #1e293b;">{{ quizData.author }}</strong>
              </p>
              <p class="summary-text" style="font-size: 0.85rem; color: #94a3b8; margin: 0; display: flex; align-items: center;">
                <i class="pi pi-calendar" style="margin-right: 0.75rem; color: #7f56d9;"></i>
                <span style="flex: 1;">Last updated on:</span>
                <strong style="color: #1e293b;">{{ quizData.lastUpdated }}</strong>
              </p>
              <p class="summary-text" style="font-size: 0.85rem; color: #94a3b8; margin: 0; display: flex; align-items: center;">
                <i class="pi pi-chart-bar" style="margin-right: 0.75rem; color: #7f56d9;"></i>
                <span style="flex: 1;">Difficulty Level:</span>
                <span class="tag-purple" style="font-size: 0.75rem;">{{ quizData.level }}</span>
              </p>
            </div>
          </div>
        </div>
      } @else {
        <!-- GUEST SIDEBAR -->
        <div class="side-card quick-actions-card">
          <span class="side-label">QUICK ACTIONS</span>
          <div class="action-list">
            <button class="action-item" (click)="shareQuiz()">
              <i class="pi pi-share-alt" style="color: #64748b;"></i>
              <span>Share Quiz</span>
            </button>
          </div>
        </div>

        <div class="side-card detail-card">
          <span class="side-label-large">Quiz Details</span>
          <div class="detail-list">
            <div class="detail-item-guest">
              <span class="detail-label">Author</span>
              <div class="val-guest">
                <span class="author-name">{{ quizData.author }}</span>
                <i class="pi pi-verified-fill verified-icon"></i>
              </div>
            </div>
            <div class="detail-item-guest">
              <span class="detail-label">Last Updated</span>
              <div class="val-guest">{{ quizData.lastUpdated }}</div>
            </div>
            <div class="detail-item-guest" style="margin-top: 1rem;">
              <span class="detail-label">Difficulty</span>
              <div class="val-guest">
                <span class="tag-purple" style="font-size: 0.75rem;">{{ quizData.level }}</span>
              </div>
            </div>
          </div>
          <p class="summary-desc-guest">
            {{ quizData.description }}
          </p>
        </div>
      }
    </aside>
\;

const startIdx = content.indexOf('<!-- C?T PH?I (SIDEBAR) -->');
if (startIdx !== -1) {
  content = content.substring(0, startIdx) + correctSidebar + '\n\n  </div>\n</div>';
  fs.writeFileSync('src/app/features/quiz/quiz-detail/quiz-detail.html', content);
}

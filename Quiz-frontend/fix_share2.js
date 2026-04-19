const fs = require('fs'); 
let f = fs.readFileSync('src/app/features/quiz/quiz-detail/quiz-detail.html','utf8'); 
f = f.replace(/<button class="action-item">\s*<i class="pi pi-share-alt text-secondary"><\/i>\s*<span \(click\)='shareQuiz\(\)'>Share Quiz<\/span>\s*<\/button>/g, '<button class="action-item" (click)="shareQuiz()"><i class="pi pi-share-alt text-secondary"></i><span>Share Quiz</span></button>'); 
fs.writeFileSync('src/app/features/quiz/quiz-detail/quiz-detail.html', f);

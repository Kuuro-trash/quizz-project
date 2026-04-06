import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  text: string;
  multipleCorrect: boolean;
  timeLimit: number;
  points: number;
  answers: Answer[];
}

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-quiz.html',
  styleUrls: ['./create-quiz.css']
})
export class CreateQuiz {
  quizTitle = '';
  quizDescription = '';
  quizLevel = 'Easy';

  questions: Question[] = [
    this.generateNewQuestion(1)
  ];

  activeQuestionIndex = 0;

  get activeQuestion(): Question {
    return this.questions[this.activeQuestionIndex];
  }

  generateNewQuestion(id: number): Question {
    return {
      id,
      text: '',
      multipleCorrect: false,
      timeLimit: 20,
      points: 100,
      answers: [
        { id: 1, text: '', isCorrect: true },
        { id: 2, text: '', isCorrect: false },
        { id: 3, text: '', isCorrect: false },
        { id: 4, text: '', isCorrect: false },
      ]
    };
  }

  selectLevel(level: string) {
    this.quizLevel = level;
  }

  addQuestion() {
    const newId = this.questions.length > 0 ? Math.max(...this.questions.map(q => q.id)) + 1 : 1;
    this.questions.push(this.generateNewQuestion(newId));
    this.activeQuestionIndex = this.questions.length - 1;
  }

  selectQuestion(index: number) {
    this.activeQuestionIndex = index;
  }

  deleteQuestion(index: number) {
    if (this.questions.length === 1) {
      alert("A quiz must have at least one question.");
      return;
    }
    this.questions.splice(index, 1);
    if (this.activeQuestionIndex >= this.questions.length) {
      this.activeQuestionIndex = this.questions.length - 1;
    }
  }

  copyQuestion(index: number) {
    const original = this.questions[index];
    const newId = Math.max(...this.questions.map(q => q.id)) + 1;
    const copy: Question = JSON.parse(JSON.stringify(original));
    copy.id = newId;
    this.questions.splice(index + 1, 0, copy);
    this.activeQuestionIndex = index + 1;
  }

  addAnswer() {
    const q = this.activeQuestion;
    if (q.answers.length >= 6) {
      alert("Maximum 6 answers allowed.");
      return;
    }
    const newId = q.answers.length > 0 ? Math.max(...q.answers.map(a => a.id)) + 1 : 1;
    q.answers.push({ id: newId, text: '', isCorrect: false });
  }

  deleteAnswer(ansIndex: number) {
    if (this.activeQuestion.answers.length <= 2) {
      alert("A question must have at least 2 answers.");
      return;
    }
    this.activeQuestion.answers.splice(ansIndex, 1);
  }

  toggleCorrectAnswer(ansIndex: number) {
    const q = this.activeQuestion;
    if (!q.multipleCorrect) {
      q.answers.forEach((ans, i) => {
        ans.isCorrect = (i === ansIndex);
      });
    } else {
      q.answers[ansIndex].isCorrect = !q.answers[ansIndex].isCorrect;
    }
  }

  onMultipleCorrectChange() {
    const q = this.activeQuestion;
    if (!q.multipleCorrect) {
      let foundCorrect = false;
      q.answers.forEach(ans => {
        if (ans.isCorrect) {
          if (!foundCorrect) foundCorrect = true;
          else ans.isCorrect = false;
        }
      });
      if (!foundCorrect && q.answers.length > 0) {
        q.answers[0].isCorrect = true;
      }
    }
  }
}

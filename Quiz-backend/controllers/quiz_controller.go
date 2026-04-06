package controllers

import (
"encoding/json"
"net/http"
"quiz-backend/config"
"quiz-backend/models"

"github.com/gin-gonic/gin"
"github.com/google/uuid"
)

type CreateQuizInput struct {
Title       string                `json:"title"`
Description string                `json:"description"`
Level       string                `json:"level"`
Questions   []CreateQuestionInput `json:"questions"`
}

type AnswerInput struct {
Text      string `json:"text"`
IsCorrect bool   `json:"is_correct"`
}

type CreateQuestionInput struct {
Content         string        `json:"content"`
TimeLimit       int           `json:"time_limit"`
Points          int           `json:"points"`
MultipleCorrect bool          `json:"multiple_correct"`
Answers         []AnswerInput `json:"answers"`
}

func CreateQuiz(c *gin.Context) {
var input CreateQuizInput

if err := c.ShouldBindJSON(&input); err != nil {
c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body", "details": err.Error()})
return
}

if input.Title == "" {
c.JSON(http.StatusBadRequest, gin.H{"error": "Title is required"})
return
}

var createdBy *uuid.UUID = nil // Optional user ID

tx := config.DB.Begin()

quiz := models.Quiz{
Title:     input.Title,
CreatedBy: createdBy,
}

if err := tx.Create(&quiz).Error; err != nil {
tx.Rollback()
c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create quiz"})
return
}

var questions []models.Question
for _, qData := range input.Questions {
optionsJSON, err := json.Marshal(qData.Answers)
if err != nil {
tx.Rollback()
c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not marshal answers"})
return
}

q := models.Question{
QuizID:          quiz.ID,
Content:         qData.Content,
TimeLimit:       qData.TimeLimit,
Points:          qData.Points,
MultipleCorrect: qData.MultipleCorrect,
Options:         string(optionsJSON),
}
questions = append(questions, q)
}

if len(questions) > 0 {
if err := tx.Create(&questions).Error; err != nil {
tx.Rollback()
c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create questions", "details": err.Error()})
return
}
}

tx.Commit()

c.JSON(http.StatusCreated, gin.H{
"message": "Quiz created successfully",
"quiz":    quiz,
})
}

package models

import (
"time"
"github.com/google/uuid"
)

type Quiz struct {
ID        uuid.UUID  `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
Title     string     `json:"title" gorm:"type:varchar(100);not null"`
CreatedBy *uuid.UUID `json:"created_by" gorm:"type:uuid"`
CreatedAt time.Time  `json:"created_at" gorm:"autoCreateTime"`
}

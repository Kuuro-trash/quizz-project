package controllers

import (
	"net/http"
	"quiz-backend/config"
	"quiz-backend/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// =======================
// REGISTER
// =======================
func Register(c *gin.Context) {
	var input models.User

	// 1. Validate JSON input
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Dữ liệu không hợp lệ!",
		})
		return
	}

	// 2. Check email đã tồn tại chưa
	var existingUser models.User
	if err := config.DB.Where("email = ?", input.Email).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Email đã tồn tại!",
		})
		return
	}

	// 3. Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), 14)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Lỗi mã hóa mật khẩu!",
		})
		return
	}

	input.Password = string(hashedPassword)

	// 4. Lưu vào DB
	if err := config.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Không thể đăng ký người dùng!",
		})
		return
	}

	// 5. Trả về kết quả (KHÔNG trả password)
	c.JSON(http.StatusOK, gin.H{
		"message": "Đăng ký thành công!",
		"user": gin.H{
			"id":       input.ID,
			"username": input.Username,
			"email":    input.Email,
		},
	})
}

// =======================
// LOGIN
// =======================
func Login(c *gin.Context) {
	var input models.User
	var user models.User

	// 1. Validate input
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Dữ liệu không hợp lệ!",
		})
		return
	}

	// 2. Tìm user theo email hoặc username
	// Bạn có thể nhập Username hoặc Email vào ô Email đều được
	if err := config.DB.Where("email = ? OR username = ?", input.Email, input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Email/Username hoặc mật khẩu không đúng!",
		})
		return
	}

	// 3. So sánh password (bcrypt)
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Email/Username hoặc mật khẩu không đúng!",
		})
		return
	}

	// 4. Trả về user (KHÔNG trả password)
	c.JSON(http.StatusOK, gin.H{
		"message": "Đăng nhập thành công!",
		"user": gin.H{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
		},
	})
}

package auth

import (
	"errors"

	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/domain/model"
	"github.com/rhesatsaqif23/diro-reservation-app/backend/internal/infrastructure/security"
	"gorm.io/gorm"
)

type Usecase struct {
	db *gorm.DB
}

func NewUsecase(db *gorm.DB) *Usecase {
	return &Usecase{db: db}
}

// Register creates new user
func (u *Usecase) Register(name, email, password string) (*model.User, error) {
	var existing model.User
	if err := u.db.Where("email = ?", email).First(&existing).Error; err == nil {
		return nil, errors.New("email already registered")
	}

	hashedPassword, err := security.HashPassword(password)
	if err != nil {
		return nil, err
	}

	user := &model.User{
		Name:         name,
		Email:        email,
		PasswordHash: hashedPassword,
	}

	if err := u.db.Create(user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

// Login verifies email & password
func (u *Usecase) Login(email, password string) (*model.User, error) {
	var user model.User
	if err := u.db.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, errors.New("invalid email or password")
	}

	if err := security.CheckPassword(user.PasswordHash, password); err != nil {
		return nil, errors.New("invalid email or password")
	}

	return &user, nil
}

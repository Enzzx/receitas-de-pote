package requests

import (
	"context"
	
	"backend/config"
	"backend/models"
)

// look if user exists in DB
func FindUser(username string) (models.User, error) {
	var user models.User
	err := config.DB.QueryRow(context.Background(), "SELECT id, username, password FROM users WHERE username=$1", username).Scan(&user.Id, &user.Username, &user.PHash)

	return user, err
}
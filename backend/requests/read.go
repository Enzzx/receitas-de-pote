package requests

import (
	"context"
	
	"backend/config"
	"backend/models"
)

// look if user exists in DB
func FindUser(username string) (models.User, error) {
	var user models.User
	err := config.DB.QueryRow(context.Background(), "SELECT username, password FROM users WHERE username=$1", username).Scan(&user.Username, &user.PHash)

	return user, err
}

func GetUser(username string) (models.UserProfile, error) {
	var userProfile models.UserProfile
	err := config.DB.QueryRow(context.Background(), "", username).Scan()
	return userProfile, err
}

func GetUserRecipes(username string) ([]models.RecipeData, error) {
	var userRecipes []models.RecipeData
	err := config.DB.QueryRow(context.Background(), "", username).Scan()
	return userRecipes, err
}
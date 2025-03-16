package requests

import (
	"context"
	"fmt"

	"backend/config"
	"backend/models"
)

func FindUser(username string) (models.User, error) {
	var user models.User

	err := config.DB.QueryRow(context.Background(), "SELECT username, password FROM users WHERE username=$1", username).Scan(&user.Username, &user.PHash)

	return user, err
}

func GetUser(username string) (models.UserProfile, error) {
	var userProfile models.UserProfile

	err := config.DB.QueryRow(context.Background(), " SELECT U.username, COALESCE(U.pfp, ''), count(R.*) FROM users AS U LEFT JOIN recipes AS R ON U.id = R.user_id WHERE U.username = $1 GROUP BY U.id", username).Scan(&userProfile.Username, &userProfile.ProfilePic, &userProfile.RecipesCount)

	return userProfile, err
}

func GetUserRecipes(username string) ([]models.RecipeData, error) {
	var userRecipes []models.RecipeData
	
	rows, err := config.DB.Query(context.Background(), "SELECT R.id, R.image, R.title, R.description, R.slug FROM recipes AS R  INNER JOIN users AS U ON R.user_id = U.id WHERE U.username = $1", username)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	
	for rows.Next() {
		var recipe models.RecipeData
		err := rows.Scan(&recipe.Id, &recipe.Image, &recipe.Title, &recipe.Description, &recipe.Slug)
		if err != nil {
			fmt.Println("erro ao escanear linha:", err)
		}
		userRecipes = append(userRecipes, recipe)
	}

	return userRecipes, err
}
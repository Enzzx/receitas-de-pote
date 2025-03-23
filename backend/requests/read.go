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

func GetLastNews() ([]models.NewsData, error) {
	var news []models.NewsData

	rows, err := config.DB.Query(context.Background(), "SELECT N.id, N.title, N.description, COALESCE(N.image, ''), N.publication, NT.name FROM news AS N INNER JOIN news_topic AS NT ON N.topic_id = NT.id ORDER BY N.publication DESC LIMIT 5;")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var new models.NewsData
		err := rows.Scan(&new.Id, &new.Title, &new.Description, &new.Image, &new.Publication, &new.Topic)
		if err != nil {
			fmt.Println("erro ao escanear linha:", err)
			continue
		}
		news = append(news, new)
	}

	return news, err
}

func GetTopicRecipes(topic string) ([]models.RecipeData, error) {
	var recipes []models.RecipeData

	rows, err := config.DB.Query(context.Background(), "")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var recipe models.RecipeData
		err := rows.Scan(&recipe.Id, &recipe.Title, &recipe.Image , &recipe.Description, &recipe.Slug)
		if err != nil {
			fmt.Println("erro ao escanear linha:", err)
			continue
		}
		recipes = append(recipes, recipe)
	}

	return recipes, err
}
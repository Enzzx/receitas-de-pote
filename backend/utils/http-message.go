package utils

import (
	"backend/models"
	"encoding/json"
)

func HttpBody(successfull bool, message string, data string) (string, error) {
	var HttpBody models.HttpAccBody
	HttpBody.Succesfull = successfull
	HttpBody.Message = message
	HttpBody.Data = data

	parsedHttp, err := json.Marshal(HttpBody)
	return string(parsedHttp), err
}

func HttpPBody(successfull bool, message string, user *models.UserProfile, recipes *[]models.RecipeData) (string, error) {
	var httpBody models.HttpProfileBody
	httpBody.Succesfull = successfull
	httpBody.Message = message

	if user != nil {
		httpBody.Data.Profile = *user
	}
	if recipes != nil {
		httpBody.Data.Recipes = *recipes
	}

	parsedHttp, err := json.Marshal(httpBody)
	return string(parsedHttp), err
}

func HttpNBody(successfull bool, message string, news []models.NewsData) (string, error) {
	var httpBody models.HttpNewsBody
	httpBody.Successfull = successfull
	httpBody.Message = message

	if news != nil {
		httpBody.Data = news
	}

	parsedHttp, err := json.Marshal(httpBody)
	return string(parsedHttp), err
}

func HttpRBody(successfull bool, message string, recipes []models.RecipeData) (string, error) {
	var httpBody models.HttpRecipesBody
	httpBody.Successfull = successfull
	httpBody.Message = message

	if recipes != nil {
		httpBody.Data = recipes
	}

	parsedHttp, err := json.Marshal(httpBody)
	return string(parsedHttp), err
}
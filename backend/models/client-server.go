package models

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// request (both endpoint and DB) structs

type LoginReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type User struct {
	Username string
	PHash    string
}

type HttpAccBody struct {
	Message     string
	Successfull bool
	Data        string
}

type UserProfile struct {
	Username     string
	ProfilePic   string
	RecipesCount int
}

type RecipeData struct {
	Id          int
	Image       string
	Title       string
	Description string
	Slug        string
}

type FullRecipeData struct {
	Id          int
	Image       string
	Title       string
	Description string
	Slug        string
	PrepTime    string
	CookTime    string
	Servings    int
	Difficulty  string
	Ingredients []string
	Instructions []string
	Author       struct {
		Username string
		Img      string
	}
	Tags []string
}

type NewsData struct {
	Id          int
	Title       string
	Description string
	Image       string
	Publication time.Time
	Topic       string
}

type HttpProfileBody struct {
	Message     string
	Successfull bool
	Data        struct {
		Profile UserProfile
		Recipes []RecipeData
	}
}

type HttpNewsBody struct {
	Message     string
	Successfull bool
	Data        []NewsData
}

type HttpRecipesBody struct {
	Message     string
	Successfull bool
	Data        []RecipeData
}

type HttpFullRecipeBody struct {
	Message     string
	Successfull bool
	Data        FullRecipeData
}

type HttpSearchBody struct {
	Message     string
	Successfull bool
	Data        struct {
		Recipes []RecipeData
		News    []NewsData
	}
}

type Claims struct {
	Username string
	jwt.RegisteredClaims
}

type RecipeImageUpdateRequest struct {
	Slug  string
	Image string
}
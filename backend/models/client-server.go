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
	Message    string
	Successfull bool
	Data       string
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

type HttpProfileBody struct {
	Message    string
	Successfull bool
	Data       struct {
		Profile UserProfile
		Recipes []RecipeData
	}
}

type NewsData struct {
	Id          int
	Title       string
	Description string
	Image       string
	Publication time.Time
	Topic       string
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

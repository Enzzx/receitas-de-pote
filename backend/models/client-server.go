package models

import (
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
	Succesfull bool
	Data       string
}

type UserProfile struct {
	Username     string
	ProfilePic   string
	recipesCount int
}

type RecipeData struct {
	Id      int
	Image   string
	Title   string
	Caption string
	Slug    string
}

type HttpProfileBody struct {
	Message    string
	Succesfull bool
	Data       struct {
		Profile UserProfile
		Recipes []RecipeData
	}
}

type Claims struct {
	Username string
	jwt.RegisteredClaims
}
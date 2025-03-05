package models

import (
	"github.com/golang-jwt/jwt/v5"
)

//request (both endpoint and DB) structs

type LoginReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type User struct {
	Id       int
	Username string
	PHash    string
}

type HttpAccBody struct {
	Message    string
	Succesfull bool
	Data       string
}

type Claims struct {
	Username string `"json":"username"`
	jwt.RegisteredClaims
}
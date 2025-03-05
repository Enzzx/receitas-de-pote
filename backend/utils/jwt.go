package utils

import (
	"backend/models"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("SPFC")

// generate a jwt token
func GenerateJWT(username string) (string, error) {
	expireTime := time.Now().Add(7 * 24 * time.Hour)
	claims := &models.Claims{
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expireTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}

// verify if a token is valid
func ValidateJWT(token string) (*models.Claims, error) {
	claims := &models.Claims{}

	valToken, err := jwt.ParseWithClaims(token, claims, func(valToken *jwt.Token) (any, error) {
		return jwtKey, nil
	})

	if err != nil || !valToken.Valid {
		return nil, fmt.Errorf("token inválido")
	}

	return claims, nil
}
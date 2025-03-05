package middleware

import (
	"context"
	"net/http"
	"strings"
	
	"backend/utils"
)

func Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHead := r.Header.Get("Authorization")

		token := strings.TrimPrefix(authHead, "Bearer ")
		username, _ := utils.ValidateJWT(token)

		ctx := r.Context()
		ctx = context.WithValue(ctx, "username", username.Username)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
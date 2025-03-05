package main

import (
	"net/http"
	
	"backend/handlers"
	"backend/middleware"
)

// add endpoints to mux
func registerRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/", handlers.Hi)
	mux.HandleFunc("/login", handlers.LogIn)
	mux.HandleFunc("/signin", handlers.SignIn)
	mux.Handle("/user/info", middleware.Auth(http.HandlerFunc(handlers.UserInfo)))
	mux.Handle("/user/profile",middleware.Auth(http.HandlerFunc(handlers.UserProfile)))
}
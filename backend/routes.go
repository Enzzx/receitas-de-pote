package main

import (
	"net/http"
	
	"backend/handlers"
)

// add endpoints to mux
func registerRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/", handlers.Hi)
	mux.HandleFunc("/login", handlers.LogIn)
	mux.HandleFunc("/signin", handlers.SignIn)
}
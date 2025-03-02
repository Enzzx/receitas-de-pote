package main

import (
	"net/http"
	
	"backend/handlers"
)

func registerRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/", handlers.Hi)
}
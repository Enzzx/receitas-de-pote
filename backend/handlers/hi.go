package handlers

import (
	"fmt"
	"net/http"
)

func Hi (w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Fprintf(w, "Hello, Go backend! :)\n")
}
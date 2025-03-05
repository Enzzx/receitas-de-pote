package main

import (
	"log"
	"net/http"
	"time"

	"backend/config"
	"backend/middleware"
)


func main() {
    // connecting to DB
    config.ConnectDB()
    defer config.CloseDB()


    // server
    mux := http.NewServeMux()
    registerRoutes(mux)

    middlewareHandle := middleware.Cors(middleware.LoggingHandler(mux))
    server := &http.Server {
        Addr: ":8080",
        Handler: middlewareHandle,
        ReadTimeout: 5 * time.Second,
        WriteTimeout: 5 * time.Second,
        IdleTimeout: 10 * time.Second,
    }

    log.Println("Servidor iniciado na porta " + server.Addr)
    log.Fatal(server.ListenAndServe())
}
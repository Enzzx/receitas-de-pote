package main

import (
    "log"
    "net/http"
    "time"

    "backend/config"
    "backend/middleware"
)


func main() {
    //conectando ao banco de dados
    config.ConnectDB()
    defer config.CloseDB()


    // server
    mux := http.NewServeMux()
    registerRoutes(mux)

    server := &http.Server {
        Addr: ":8080",
        Handler: middleware.LoggingHandler(mux),
        ReadTimeout: 5 * time.Second,
        WriteTimeout: 10 * time.Second,
        IdleTimeout: 20 * time.Second,
    }

    log.Println("Servidor iniciado na porta " + server.Addr)
    log.Fatal(server.ListenAndServe())
}
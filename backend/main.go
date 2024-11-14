package main

import (
    "context"
    "fmt"
    "log"
    "os"
    "net/http"

    "github.com/joho/godotenv"
    "github.com/jackc/pgx/v5"
)

func main() {
    //carrega as variáveis do arquivo .env
    err := godotenv.Load()
    if err != nil {
        log.Fatal("erro ao carregar arquivo .env")
    }

    //credencias do .env
    dbHost := os.Getenv("DATABASE_HOST")
    dbUser := os.Getenv("DATABASE_USER")
    dbPassword := os.Getenv("DATABASE_PASSWORD")
    dbName := os.Getenv("DATABASE_NAME")
    dbPort := os.Getenv("DATABASE_PORT")

    dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s", dbUser, dbPassword, dbHost, dbPort, dbName)

    conn, err := pgx.Connect(context.Background(), dsn)
    if err != nil {
        log.Fatalf("erro ao conectar ao banco de dados: %v", err)
    }
    defer conn.Close(context.Background())

    fmt.Println("conexão com o banco de dados bem-sucedida")

    //endpoints
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        fmt.Fprintf(w, "Hello, Go backend!")
    })

    log.Println("Servidor iniciado em http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

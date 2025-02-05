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

func createTables(conn *pgx.Conn) error {
    queries := []string{
        `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            pfp TEXT
        );`,

        `CREATE TABLE IF NOT EXISTS recipes (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            image TEXT,
            content TEXT NOT NULL,
            publication TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            slug VARCHAR(255) UNIQUE NOT NULL
        );`,

        `CREATE TABLE IF NOT EXISTS ingredient (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL
        );`,

        `CREATE TABLE IF NOT EXISTS recipe_ingredient (
            recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
            ingredient_id INTEGER REFERENCES ingredient(id) ON DELETE CASCADE,
            quantity VARCHAR(100),
            PRIMARY KEY (recipe_id, ingredient_id)
        );`,

        `CREATE TABLE IF NOT EXISTS news_topic (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) UNIQUE NOT NULL
        );`,

        `CREATE TABLE IF NOT EXISTS news (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            image TEXT,
            content TEXT NOT NULL,
            publication TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            topic_id INTEGER REFERENCES news_topic(id) ON DELETE RESTRICT
        )`,
    }

    for _, query := range queries {
        _, err := conn.Exec(context.Background(), query)
        if err != nil {
            return fmt.Errorf("erro ao executar consulta: %v", err)
        }
    }

    fmt.Println("Tabelas criadas ou já existentes")
    return nil
}

func main() {
    //carrega as variáveis do arquivo .env
    err := godotenv.Load()

    //credencias do .env
    dbHost := os.Getenv("PGHOST")
    dbUser := os.Getenv("PGUSER")
    dbPassword := os.Getenv("PGPASSWORD")
    dbName := os.Getenv("PGDATABASE")
    dbPort := os.Getenv("PGPORT")

    dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s", dbUser, dbPassword, dbHost, dbPort, dbName)

    conn, err := pgx.Connect(context.Background(), dsn)
    if err != nil {
        log.Fatalf("erro ao conectar ao banco de dados: %v", err)
    }
    defer conn.Close(context.Background())

    fmt.Println("conexão com o banco de dados bem-sucedida")

    //criar tabelas
    if err := createTables(conn); err != nil {
        log.Fatalf("Erro ao criar tabelas: %v", err)
    }

    //endpoints
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        fmt.Fprintf(w, "Hello, Go backend!")
    })

    log.Println("Servidor iniciado em http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

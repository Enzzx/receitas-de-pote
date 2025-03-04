package config

import (
    "context"
    "fmt"
    "log"
    "os"

    "github.com/joho/godotenv"
    "github.com/jackc/pgx/v5"
)

var DB *pgx.Conn

// open connection to postgresSQL
func ConnectDB() {
	err := godotenv.Load()

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
	DB = conn

    fmt.Println("conexão com o banco de dados bem-sucedida")
}

// end connection
func CloseDB() {
	DB.Close(context.Background())
	log.Println("Conexão com o banco fechada")
}
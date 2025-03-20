package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

var DB *pgxpool.Pool

// open connection to postgresSQL
func ConnectDB() {
	err := godotenv.Load()

    dbHost := os.Getenv("PGHOST")
    dbUser := os.Getenv("PGUSER")
    dbPassword := os.Getenv("PGPASSWORD")
    dbName := os.Getenv("PGDATABASE")
    dbPort := os.Getenv("PGPORT")

    dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s", dbUser, dbPassword, dbHost, dbPort, dbName)

    config, _ := pgxpool.ParseConfig(dsn)
    config.MaxConns = 10
    config.MinConns = 2
    config.MaxConnLifetime = time.Hour
    config.MaxConnIdleTime = 30 * time.Minute
    config.ConnConfig.ConnectTimeout = 10 * time.Second

    conn, err := pgxpool.NewWithConfig(context.Background(), config)
    if err != nil {
        log.Fatalf("erro ao conectar ao banco de dados: %v", err)
    }
	DB = conn

    fmt.Println("conexão com o banco de dados bem-sucedida")
}

// end connection
func CloseDB() {
	DB.Close()
	log.Println("Conexão com o banco fechada")
}
package handlers

import (
	"encoding/json"
	"fmt"
	"github.com/jackc/pgx/v5"
	"net/http"

	"backend/models"
	"backend/requests"
	"backend/utils"
)

func SignIn(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	var req models.LoginReq
	_ = json.NewDecoder(r.Body).Decode(&req)

	_, err := requests.FindUser(req.Username)
	if err == nil {
		http.Error(w, `{"error": "usuário já existente"}`, http.StatusConflict)
		return
	} else if err != pgx.ErrNoRows {
		fmt.Printf("erro: %v", err)
		http.Error(w, `{"error": "erro interno do servidor"}`, http.StatusInternalServerError)
		return
	}

	err = requests.AddUser(req)
	if err != nil {
		fmt.Printf("erro: %v", err)
		http.Error(w, `"error":"erro interno do servidor"`, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	fmt.Fprint(w, `{"message":"usuário criado com sucesso"}`)
}

func LogIn(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	var req models.LoginReq
	_ = json.NewDecoder(r.Body).Decode(&req)

	user, err := requests.FindUser(req.Username)
	if err == pgx.ErrNoRows {
		http.Error(w, `{"error": "usuário não encontrado"}`, http.StatusUnauthorized)
		return
	} else if err != nil {
		fmt.Printf("erro: %v", err)
		http.Error(w, `{"error": "erro interno do servidor"}`, http.StatusInternalServerError)
		return
	}

	if !utils.CheckPHash(req.Password, user.PHash) {
		http.Error(w, `{"error": "senha incorreta"}`, http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, `{"message": "login efetuado"}`)
}
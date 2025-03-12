package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"github.com/jackc/pgx/v5"

	"backend/models"
	"backend/requests"
	"backend/utils"
)

func SignIn(w http.ResponseWriter, r *http.Request) {

	var req models.LoginReq
	_ = json.NewDecoder(r.Body).Decode(&req)

	_, err := requests.FindUser(req.Username)
	if err == nil {
		parsedHttp, _ := utils.HttpBody(false, "usuário já existente", "")
		http.Error(w, parsedHttp, http.StatusConflict)
		return
	} else if err != pgx.ErrNoRows {
		fmt.Printf("erro: %v", err)
		parsedHttp, _ := utils.HttpBody(false, "erro interno do servidor", "")
		http.Error(w, parsedHttp, http.StatusInternalServerError)
		return
	}

	err = requests.AddUser(req)
	if err != nil {
		fmt.Printf("erro: %v", err)
		parsedHttp, _ := utils.HttpBody(false, "erro interno do servidor", "")
		http.Error(w, parsedHttp, http.StatusInternalServerError)
		return
	}

	parsedHttp, _ := utils.HttpBody(true, "usuário criado com sucesso", "")
	w.WriteHeader(http.StatusCreated)
	fmt.Fprint(w, parsedHttp)
}

func LogIn(w http.ResponseWriter, r *http.Request) {

	var req models.LoginReq
	_ = json.NewDecoder(r.Body).Decode(&req)

	user, err := requests.FindUser(req.Username)
	if err == pgx.ErrNoRows {
		parsedHttp, _ := utils.HttpBody(false, "usuário não encontrado", "")
		http.Error(w, parsedHttp, http.StatusUnauthorized)
		return
	} else if err != nil {
		fmt.Printf("erro: %v", err)
		parsedHttp, _ := utils.HttpBody(false, "erro interno do servidor", "")
		http.Error(w, parsedHttp, http.StatusInternalServerError)
		return
	}

	if !utils.CheckPHash(req.Password, user.PHash) {
		parsedHttp, _ := utils.HttpBody(false, "senha incorreta", "")
		http.Error(w, parsedHttp, http.StatusUnauthorized)
		return
	}

	token, _ := utils.GenerateJWT(user.Username)

	parsedHttp, _ := utils.HttpBody(true, "login efetuado com sucesso", token)
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, parsedHttp)
}

func UserInfo(w http.ResponseWriter, r *http.Request) {
	username := r.Context().Value("username").(string)

	parsedHttp, _ := utils.HttpBody(true, "valor de token válido", username)
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, parsedHttp)
}

func UserProfile(w http.ResponseWriter, r *http.Request) {
	username := r.Context().Value("username").(string)

	userProfile, err := requests.GetUser(username)
	if err != nil {
		var HttpProfile models.HttpProfileBody
		HttpProfile.Message = "usuário não encontrado"
		HttpProfile.Succesfull = false
		parsedHttp, _ := json.Marshal(HttpProfile)
		http.Error(w, string(parsedHttp), http.StatusUnauthorized)
		return
	}

	userRecipes, _ := requests.GetUserRecipes(username)

	var HttpProfile models.HttpProfileBody
	HttpProfile.Message = "dados de usuários enviados com sucesso"
	HttpProfile.Succesfull = true
	HttpProfile.Data.Profile = userProfile
	HttpProfile.Data.Recipes = userRecipes
	w.WriteHeader(http.StatusOK)
	parsedHttp, _ := json.Marshal(HttpProfile)
	fmt.Fprint(w, string(parsedHttp))
}

func DeleteAccount(w http.ResponseWriter, r *http.Request) {
	var username string
	_ = json.NewDecoder(r.Body).Decode(&username)

	err := requests.DeleteUser(username)
	if err != nil {
		parsedHttp, _ := utils.HttpBody(false, "a conta não pôde ser deletada", "")
		http.Error(w, parsedHttp, http.StatusInternalServerError)
		return
	}

	parsedHttp, _ := utils.HttpBody(true, "conta deletada com sucesso", "")
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, parsedHttp)
}
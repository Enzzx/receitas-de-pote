package handlers

import (
	"fmt"
	"net/http"
	"encoding/json"

	"backend/requests"
	"backend/utils"
	"backend/models"
)

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
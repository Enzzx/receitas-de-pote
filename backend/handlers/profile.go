package handlers

import (
	"fmt"
	"net/http"

	"backend/requests"
	"backend/utils"
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
		parsedHttp, _ := utils.HttpPBody(false, "usuário não encontrado", nil, nil)
		http.Error(w, parsedHttp, http.StatusUnauthorized)
		return
	}

	userRecipes, _ := requests.GetUserRecipes(username)

	w.WriteHeader(http.StatusOK)
	parsedHttp, _ := utils.HttpPBody(true, "dados de usuários enviados com sucesso", &userProfile, &userRecipes)
	fmt.Fprint(w, parsedHttp)
}
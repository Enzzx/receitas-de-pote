package handlers

import (
	"fmt"
	"net/http"

	"backend/requests"
	"backend/utils"
)

func GetRecipesByTopic(w http.ResponseWriter, r *http.Request) {
	topic := r.URL.Query().Get("topic")

	recipes, err := requests.GetTopicRecipes(topic)
	if err != nil {
		parsedHttp, _ := utils.HttpRBody(false, "não foi possível pegar as receitas", nil)
		http.Error(w, parsedHttp, http.StatusInternalServerError)
	}

	parsedHttp, _ := utils.HttpRBody(true, "últimas receitas sobre o tópico", recipes)
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, parsedHttp)
}

func GetFullRecipe(w http.ResponseWriter, r *http.Request) {
	slug := r.URL.Query().Get("slug")

	recipe, err := requests.GetRecipeContent(slug)
	if err != nil {
		fmt.Println(err)
		parsedHttp, _ := utils.HttpFRBody(false, "a receita não foi encontrada", nil)
		http.Error(w, parsedHttp, http.StatusInternalServerError)
	}

	parsedHttp, _ := utils.HttpFRBody(true, "conteúod da receita pego com sucesso", &recipe)
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, parsedHttp)
}
package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"backend/models"
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

func AddImageRecipe(w http.ResponseWriter, r *http.Request) {
	_, ok := r.Context().Value("username").(string)
	var req models.RecipeImageUpdateRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || !ok {
		parsedHttp, _ := utils.HttpBody(false, "Não foi possível pegar os dados da requisição", "")
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprint(w, parsedHttp)
		return
	}

	err := requests.UpdateRecipeImage(req.Slug, req.Image)
	if err != nil {
		parsedHttp, _ := utils.HttpBody(false, "erro ao inserir imagem", "")
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprint(w, parsedHttp)
		return
	}

	parsedHttp, _ := utils.HttpBody(true, "inserção bem sucedida", req.Image)
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, parsedHttp)
}

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
		fmt.Println(err)
		parsedHttp, _ := utils.HttpRBody(false, "não foi possível pegar as receitas", nil)
		http.Error(w, parsedHttp, http.StatusInternalServerError)
	}

	parsedHttp, _ := utils.HttpRBody(true, "últimas receitas sobre o tópico", recipes)
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, parsedHttp)
}
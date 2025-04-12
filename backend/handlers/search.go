package handlers

import (
	"fmt"
	"net/http"

	"backend/requests"
	"backend/utils"
)

func SearchQuery(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("query")

	news, _ := requests.GetNewsByTitle(query)
	recipes, _ := requests.GetRecipesByTitle(query)

	parsedHttp, _ := utils.HttpSBody(true, "busca da pesquisa", &news, &recipes)
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, parsedHttp)
}
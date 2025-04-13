package handlers

import (
	"fmt"
	"net/http"

	"backend/requests"
	"backend/utils"
)

func SearchQuery(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("query")

	news, err := requests.GetNewsByTitle(query)
	if err != nil {
		fmt.Println(err)
	}
	recipes, err := requests.GetRecipesByTitle(query)
	if err != nil {
		fmt.Println(err)
	}

	parsedHttp, _ := utils.HttpSBody(true, "busca da pesquisa", &news, &recipes)
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, parsedHttp)
}
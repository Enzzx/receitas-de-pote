package handlers

import (
	"fmt"
	"net/http"

	"backend/requests"
	"backend/utils"
)


func LastNews(w http.ResponseWriter, r *http.Request) {
	news, err := requests.GetLastNews()
	if err != nil {
		fmt.Printf("erro na consulta %v\n", err)
	}

	parsedHttp, err := utils.HttpNBody(true, "Últimas notícias" , news)
	if err != nil {
		fmt.Printf("erro no parse para string %v\n", err)
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, parsedHttp)
}
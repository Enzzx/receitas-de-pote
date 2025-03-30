package handlers

import (
	"fmt"
	"net/http"

	"backend/requests"
	"backend/utils"
)


func MainNews(w http.ResponseWriter, r *http.Request) {
	news, err := requests.GetLastNews()
	if err != nil {
		fmt.Printf("erro na consulta %v\n", err)
		parsedHttp, _ := utils.HttpNBody(false, "erro ao pegar últimas notícias", nil)
		http.Error(w, parsedHttp, http.StatusInternalServerError)
	}

	parsedHttp, _ := utils.HttpNBody(true, "Últimas notícias", news)

	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, parsedHttp)
}

func News(w http.ResponseWriter, r *http.Request) {
	news, err := requests.GetNews()
	if err != nil {
		fmt.Printf("erro na consulta %v\n", err)
		parsedHttp, _ := utils.HttpNBody(false, "erro ao pegar notícias", nil)
		http.Error(w, parsedHttp, http.StatusInternalServerError)
	}

	parsedHttp, _ := utils.HttpNBody(true, "Notícias", news)

	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, parsedHttp)
}
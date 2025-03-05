package utils

import (
	"backend/models"
	"encoding/json"
)

func HttpBody(succesfull bool, message string, data string) (string, error) {
	var HttpBody models.HttpAccBody
	HttpBody.Succesfull = succesfull
	HttpBody.Message = message
	HttpBody.Data = data

	parsedHttp, err := json.Marshal(HttpBody)
	return string(parsedHttp), err
}
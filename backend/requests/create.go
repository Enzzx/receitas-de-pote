package requests

import (
	"context"

	"backend/config"
	"backend/models"
	"backend/utils"
)

// add new user register to DB table
func AddUser(user models.LoginReq) error {
	hash, _ := utils.NewPHash(user.Password)

	_, err := config.DB.Exec(context.Background(), 
	"INSERT INTO users (username, password) VALUES ($1, $2)", user.Username, hash)

	return err
}
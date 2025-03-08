package requests

import (
	"context"

	"backend/config"
)

func DeleteUser(username string) error {
	_, err := config.DB.Exec(context.Background(), "DELETE FROM users WHERE username=$1", username)

	return err
}
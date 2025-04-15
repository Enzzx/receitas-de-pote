package requests

import (
	"backend/config"
	"context"
)

func UpdateRecipeImage(slug string, binaryImg string) error {
	_, err := config.DB.Exec(context.Background(), "UPDATE recipes SET image = $1 where slug = $2", binaryImg, slug)

	return err
}
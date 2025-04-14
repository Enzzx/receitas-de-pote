package requests

import (
	"context"
	"fmt"

	"backend/config"
	"backend/models"
)

func FindUser(username string) (models.User, error) {
	var user models.User

	err := config.DB.QueryRow(context.Background(), "SELECT username, password FROM users WHERE username=$1", username).Scan(&user.Username, &user.PHash)

	return user, err
}

func GetUser(username string) (models.UserProfile, error) {
	var userProfile models.UserProfile

	err := config.DB.QueryRow(context.Background(), " SELECT U.username, COALESCE(U.pfp, ''), count(R.*) FROM users AS U LEFT JOIN recipes AS R ON U.id = R.user_id WHERE U.username = $1 GROUP BY U.id", username).Scan(&userProfile.Username, &userProfile.ProfilePic, &userProfile.RecipesCount)

	return userProfile, err
}

func GetUserRecipes(username string) ([]models.RecipeData, error) {
	var userRecipes []models.RecipeData
	
	rows, err := config.DB.Query(context.Background(), "SELECT R.id, R.image, R.title, R.description, R.slug FROM recipes AS R  INNER JOIN users AS U ON R.user_id = U.id WHERE U.username = $1", username)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	
	for rows.Next() {
		var recipe models.RecipeData
		err := rows.Scan(&recipe.Id, &recipe.Image, &recipe.Title, &recipe.Description, &recipe.Slug)
		if err != nil {
			fmt.Println("erro ao escanear linha:", err)
		}
		userRecipes = append(userRecipes, recipe)
	}

	return userRecipes, err
}

func GetLastNews() ([]models.NewsData, error) {
	var news []models.NewsData

	rows, err := config.DB.Query(context.Background(), "SELECT N.id, N.title, N.description, COALESCE(N.image, ''), N.publication, NT.name FROM news AS N INNER JOIN news_topic AS NT ON N.topic_id = NT.id ORDER BY N.publication DESC LIMIT 5;")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var new models.NewsData
		err := rows.Scan(&new.Id, &new.Title, &new.Description, &new.Image, &new.Publication, &new.Topic)
		if err != nil {
			fmt.Println("erro ao escanear linha:", err)
			continue
		}
		news = append(news, new)
	}

	return news, err
}

func GetNews() ([]models.NewsData, error) {
	var news []models.NewsData

	rows, err := config.DB.Query(context.Background(), "SELECT N.id, N.title, N.description, COALESCE(N.image, ''), N.publication, NT.name FROM news AS N INNER JOIN news_topic AS NT ON N.topic_id = NT.id LIMIT 30;")
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var new models.NewsData
		err := rows.Scan(&new.Id, &new.Title, &new.Description, &new.Image, &new.Publication, &new.Topic)
		if err != nil {
			fmt.Println("erro ao escanear linha:", err)
			continue
		}
		news = append(news, new)
	}

	return news, err
}

func GetTopicRecipes(topic string) ([]models.RecipeData, error) {
	var recipes []models.RecipeData

	rows, err := config.DB.Query(context.Background(), "SELECT R.id, R.title, COALESCE(R.image, ''), R.description, R.slug FROM recipes AS R INNER JOIN recipes_topic AS RT ON R.topic_id = RT.id WHERE RT.name = $1 ORDER BY R.publication DESC LIMIT 6;", topic)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var recipe models.RecipeData
		err := rows.Scan(&recipe.Id, &recipe.Title, &recipe.Image , &recipe.Description, &recipe.Slug)
		if err != nil {
			fmt.Println("erro ao escanear linha:", err)
			continue
		}
		recipes = append(recipes, recipe)
	}

	return recipes, err
}

func GetRecipesByTitle(title string) ([]models.RecipeData, error) {
	var recipes []models.RecipeData
	title = "%" + title + "%"

	rows, err := config.DB.Query(context.Background(), "SELECT id, title, COALESCE(image, ''), description, slug FROM recipes WHERE title ILIKE $1 ORDER BY publication DESC;", title)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var recipe models.RecipeData
		err := rows.Scan(&recipe.Id, &recipe.Title, &recipe.Image , &recipe.Description, &recipe.Slug)
		if err != nil {
			fmt.Println("erro ao escanear linha:", err)
			continue
		}
		recipes = append(recipes, recipe)
	}

	return recipes, err
}

func GetNewsByTitle(title string) ([]models.NewsData, error) {
	var news []models.NewsData
	title = "%" + title + "%"

	rows, err := config.DB.Query(context.Background(), "SELECT N.id, N.title, N.description, COALESCE(N.image, ''), N.publication, NT.name FROM news AS N INNER JOIN news_topic AS NT ON N.topic_id = NT.id WHERE N.title ILIKE $1;", title)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var new models.NewsData
		err := rows.Scan(&new.Id, &new.Title, &new.Description, &new.Image, &new.Publication, &new.Topic)
		if err != nil {
			fmt.Println("erro ao escanear linha:", err)
			continue
		}
		news = append(news, new)
	}

	return news, err
}

func GetRecipeContent(slug string) (models.FullRecipeData, error) {
	var recipe models.FullRecipeData
	query := "SELECT r.id AS id, COALESCE(r.image, '') AS image, COALESCE(r.title, '') AS title, COALESCE(r.description, '') AS description, COALESCE(r.slug, '') AS slug, COALESCE(r.preptime, '') AS prepTime, COALESCE(r.cooktime, '') AS cookTime, COALESCE(r.servings, 0) AS servings, COALESCE(r.difficulty, '') AS difficulty, COALESCE(u.username, '') AS author, COALESCE(u.pfp, '') AS pfp, COALESCE((SELECT array_agg(i.name) FROM recipe_ingredient ri JOIN ingredient i ON ri.ingredient_id = i.id WHERE ri.recipe_id = r.id), '{}') AS ingredients, COALESCE((SELECT array_agg(ris.instruction_text ORDER BY ris.sort_order) FROM recipe_instruction ris WHERE ris.recipe_id = r.id), '{}') AS instructions, COALESCE((SELECT array_agg(t.name) FROM recipe_tag rt JOIN tag t ON rt.tag_id = t.id WHERE rt.recipe_id = r.id), '{}') AS tags FROM recipes r JOIN users u ON r.user_id = u.id WHERE r.slug = $1;"

	err := config.DB.QueryRow(context.Background(),
	query, slug).Scan(&recipe.Id, &recipe.Image, &recipe.Title, &recipe.Description, &recipe.Slug, &recipe.PrepTime, &recipe.CookTime, &recipe.Servings, &recipe.Difficulty, &recipe.Author.Username, &recipe.Author.Img, &recipe.Ingredients, &recipe.Instructions, &recipe.Tags)

	return recipe, err
}
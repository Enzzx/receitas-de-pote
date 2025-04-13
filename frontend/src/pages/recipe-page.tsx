import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import FooterPage from '../components/footer-page';

// Type definition for a complete recipe
type FullRecipeData = {
    Id: number;
    Image: string;
    Title: string;
    Description: string;
    Slug: string;
    PrepTime: string;
    CookTime: string;
    Servings: number;
    Difficulty: string;
    Ingredients: string[];
    Instructions: string[];
    Author: {
        Username: string;
        Img: string;
    };
    Tags: string[];
    RelatedRecipes?: RecipeData[];
};

// Basic recipe data type (as provided)
type RecipeData = {
    Id: number;
    Image: string;
    Title: string;
    Description: string;
    Slug: string;
};

export default function RecipePage() {
    const { slug } = useParams();
    const [recipe, setRecipe] = useState<FullRecipeData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // This would normally be an API call to fetch the recipe data
        // For now, we'll use mock data
        const fetchRecipe = async () => {
            setLoading(true);
            try {
                // Simulating API call
                await new Promise(resolve => setTimeout(resolve, 500));

                // Mock data
                const mockRecipe: FullRecipeData = {
                    Id: 1,
                    Image: "https://placehold.co/800x500",
                    Title: "Bolo de Cenoura com Cobertura de Chocolate",
                    Description: "Um delicioso bolo de cenoura tradicional com cobertura de chocolate. Perfeito para o café da tarde ou festas de aniversário.",
                    Slug: "bolo-de-cenoura",
                    PrepTime: "20 minutos",
                    CookTime: "40 minutos",
                    Servings: 8,
                    Difficulty: "Fácil",
                    Ingredients: [
                        "2 cenouras médias, descascadas e cortadas em cubos",
                        "3 ovos",
                        "1 xícara de óleo vegetal",
                        "2 xícaras de açúcar",
                        "2 xícaras de farinha de trigo",
                        "1 colher de sopa de fermento em pó",
                        "1/2 colher de chá de sal",
                        "4 colheres de sopa de chocolate em pó",
                        "1/2 xícara de açúcar",
                        "1/3 xícara de leite",
                        "2 colheres de sopa de manteiga"
                    ],
                    Instructions: [
                        "Preaqueça o forno a 180°C. Unte uma forma redonda com manteiga e farinha.",
                        "No liquidificador, bata as cenouras, os ovos e o óleo até obter uma mistura homogênea.",
                        "Em uma tigela grande, misture a farinha, o açúcar e o sal.",
                        "Adicione a mistura de cenoura à tigela e mexa bem até incorporar todos os ingredientes.",
                        "Por último, adicione o fermento e misture levemente.",
                        "Despeje a massa na forma preparada e leve ao forno por aproximadamente 40 minutos, ou até que um palito inserido no centro saia limpo.",
                        "Para a cobertura, misture o chocolate em pó, o açúcar, o leite e a manteiga em uma panela pequena.",
                        "Cozinhe em fogo médio, mexendo constantemente, até engrossar (cerca de 5 minutos).",
                        "Despeje a cobertura sobre o bolo ainda quente e espalhe uniformemente.",
                        "Deixe esfriar completamente antes de servir."
                    ],
                    Author: {
                        Username: "mariasouza",
                        Img: "https://placehold.co/100x100"
                    },
                    Tags: ["Sobremesa", "Bolo", "Chocolate", "Cenoura"]
                };

                setRecipe(mockRecipe);
            } catch (error) {
                console.error("Error fetching recipe:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [slug]);

    if (loading) {
        return (
            <div>
                <Navbar username={sessionStorage.getItem("username")} />
                <div className="recipe-loading">
                    <div className="loading-spinner"></div>
                    <p>Carregando receita...</p>
                </div>
                <FooterPage />
            </div>
        );
    }

    if (!recipe) {
        return (
            <div>
                <Navbar username={sessionStorage.getItem("username")} />
                <div className="recipe-not-found">
                    <h2>Receita não encontrada</h2>
                    <p>Desculpe, não conseguimos encontrar a receita que você está procurando.</p>
                </div>
                <FooterPage />
            </div>
        );
    }

    return (
        <div className="recipe-page-wrapper">
            <Navbar username={sessionStorage.getItem("username")} />

            <div className="recipe-page-container">
                <div className="recipe-header">
                    <h1>{recipe.Title}</h1>
                    <div className="recipe-meta">
                        <div className="recipe-author">
                            <img src={recipe.Author.Img} alt={recipe.Author.Username} />
                            <span>Por {recipe.Author.Username}</span>
                        </div>
                        <div className="recipe-tags">
                            {recipe.Tags.map((tag, index) => (
                                <span key={index} className="recipe-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="recipe-hero">
                    <img src={recipe.Image} alt={recipe.Title} className="recipe-main-image" />
                </div>

                <div className="recipe-overview">
                    <div className="recipe-description">
                        <p>{recipe.Description}</p>
                    </div>

                    <div className="recipe-stats">
                        <div className="stat-item">
                            <span className="stat-label">Tempo de Preparo</span>
                            <span className="stat-value">{recipe.PrepTime}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Tempo de Cozimento</span>
                            <span className="stat-value">{recipe.CookTime}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Porções</span>
                            <span className="stat-value">{recipe.Servings}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Dificuldade</span>
                            <span className="stat-value">{recipe.Difficulty}</span>
                        </div>
                    </div>
                </div>

                <div className="recipe-content">
                    <div className="recipe-ingredients">
                        <h2>Ingredientes</h2>
                        <ul>
                            {recipe.Ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="recipe-instructions">
                        <h2>Modo de Preparo</h2>
                        <ol>
                            {recipe.Instructions.map((instruction, index) => (
                                <li key={index}>{instruction}</li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="recipe-actions">
                    <button className="save-button">Salvar Receita</button>
                    <button className="share-button">Compartilhar</button>
                    <button className="print-button">Imprimir</button>
                </div>
            </div>

            <FooterPage />
        </div>
    );
}
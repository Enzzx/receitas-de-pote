import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import FooterPage from '../components/footer-page';
import { FullRecipeData, HttpFullRecipeBody } from '../models';

export default function RecipePage() {
    const { slug } = useParams();
    const [recipe, setRecipe] = useState<FullRecipeData | null>(null);
    const [loading, setLoading] = useState(true);

    async function getRecipeContent(slug: string) {
        try {
            const req = await fetch(import.meta.env.VITE_BACKEND_URL + "/recipes/content?slug=" + slug)
            const res: HttpFullRecipeBody = await req.json()

            console.log(res.Message)
            if (res.Successfull) {
                setRecipe(res.Data)
            }
        } catch (e) {
            throw e
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (slug != null) {
            getRecipeContent(slug)
        }
    }, [])

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
        )
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
        )
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
    )
}
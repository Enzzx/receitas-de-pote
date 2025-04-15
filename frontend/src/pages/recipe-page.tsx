import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import FooterPage from '../components/footer-page';
import { FullRecipeData, HttpAccBody, HttpFullRecipeBody } from '../models';
import Cookies from 'js-cookie';

export default function RecipePage() {
    const { slug } = useParams()
    const [recipe, setRecipe] = useState<FullRecipeData | null>(null)
    const [loading, setLoading] = useState(true)
    const [showImageModal, setShowImageModal] = useState(false)
    const [newImage, setNewImage] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState("")
    const isAuthor = sessionStorage.getItem("username") === recipe?.Author.Username

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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewImage(e.target.files[0])
            setUploadError("")
        }
    }

    const handleImageSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!newImage) {
            setUploadError("Por favor, selecione uma imagem.")
            return
        }
    
        if (!newImage.type.startsWith('image/')) {
            setUploadError("Por favor, selecione um arquivo de imagem válido.")
            return
        }
        
        setUploading(true)
        setUploadError("")
        
        try {
            const reader = new FileReader()
        reader.readAsDataURL(newImage)
        
        reader.onload = async () => {
            const base64Image = reader.result as string
            
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/recipes/update-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("jwt")}`
                },
                body: JSON.stringify({
                    slug: slug || "",
                    image: base64Image
                })
            })
            
            const res: HttpAccBody = await response.json()
            
            if (res.Successfull) {
                if (recipe) {
                    setRecipe({
                        ...recipe,
                        Image: res.Data
                    })
                }
                setShowImageModal(false)
                setNewImage(null)
            } else {
                setUploadError(res.Message || "Erro ao atualizar a imagem.")
            }
            setUploading(false)
        }
        
        reader.onerror = () => {
            setUploadError("Erro ao processar a imagem.")
            setUploading(false)
        }
        } catch (error) {
            setUploadError("Erro de conexão. Tente novamente mais tarde.")
            console.error("Erro ao enviar imagem:", error)
        } finally {
            setUploading(false)
        }
    }

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
                            <img src={recipe.Author.Img == '' ? 'https://placehold.co/100x100' : recipe.Author.Img} alt={recipe.Author.Username} />
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
                    {isAuthor && (<button onClick={() => setShowImageModal(true)} className="edit-image-button">Editar imagem</button>)}
                </div>
            </div>

            {/* Modal para upload de imagem */}
            {showImageModal && (
                <div className="modal-overlay">
                    <div className="modal-content image-upload-modal">
                        <div className="modal-header">
                            <h3>Atualizar Imagem da Receita</h3>
                            <button 
                                className="modal-close-button"
                                onClick={() => setShowImageModal(false)}
                                aria-label="Fechar modal"
                            >
                                &times;
                            </button>
                        </div>
                        
                        <form onSubmit={handleImageSubmit} className="image-upload-form">
                            <div className="form-group">
                                <label htmlFor="recipe-image">Selecione uma nova imagem:</label>
                                <input 
                                    type="file" 
                                    id="recipe-image" 
                                    accept="image/*" 
                                    onChange={handleImageChange}
                                />
                                
                                {newImage && (
                                    <div className="image-preview">
                                        <img 
                                            src={URL.createObjectURL(newImage)} 
                                            alt="Preview" 
                                            className="preview-image" 
                                        />
                                        <p className="file-name">{newImage.name}</p>
                                    </div>
                                )}
                                
                                {uploadError && (
                                    <p className="error-message">{uploadError}</p>
                                )}
                            </div>
                            
                            <div className="form-actions">
                                <button 
                                    type="button" 
                                    className="cancel-button"
                                    onClick={() => setShowImageModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit" 
                                    className="submit-button"
                                    disabled={uploading || !newImage}
                                >
                                    {uploading ? "Enviando..." : "Atualizar Imagem"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <FooterPage />
        </div>
    )
}
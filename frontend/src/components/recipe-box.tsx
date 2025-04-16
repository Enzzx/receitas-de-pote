import { Link } from "react-router-dom"
import { RecipeData, reticence } from "../models"

export default function RecipeBox(props: RecipeData) {
    let { Image, Title, Description, Slug } = props

    return (
        <Link to={"/pages/recipes/"+Slug} className="recipe-box">
            <img src={Image} alt={Title} />
            <div className="recipe-box-info">
                <h3 className="recipe-title">{Title}</h3>
                <p>{reticence(Description)}</p>
                <p>4.5</p>
            </div>
        </Link>
    )
}
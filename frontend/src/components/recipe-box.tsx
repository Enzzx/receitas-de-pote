import { Link } from "react-router-dom"
import { RecipeData } from "../models"

export default function RecipeBox(props: RecipeData) {
    let { Image, Title, Description, Slug } = props

    function reticence(str: string): string {
        if (str.length <= 80) return str

        str = str.slice(0, 80)
        while(/[^a-zA-Z0-9]$/.test(str)) {
            str = str.slice(0, -1)
        }

        return str + "..."
    }

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
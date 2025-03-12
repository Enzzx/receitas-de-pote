import { RecipeData } from "../models"

export default function RecipeBox(props: RecipeData) {
    let { image, title, caption, slug } = props

    //take a slice of the string to show in HTML
    function reticence(str: string): string {
        if (str.length <= 80) return str

        str = str.slice(0, 80)
        while(/[^a-zA-Z0-9]$/.test(str)) {
            str = str.slice(0, -1)
        }

        return str + "..."
    }

    return (
        <a href={slug} className="recipe-box">
            <img src={image} alt={title} />
            <div className="recipe-box-info">
                <h3>{title}</h3>
                <p>{reticence(caption)}</p>
                <p>4.5</p>
            </div>
        </a>
    )
}
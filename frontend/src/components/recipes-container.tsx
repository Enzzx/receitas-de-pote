import RecipeBox from "./recipe-box";
import { Recipe } from "../models"

export default function RecipesContainer(props: Recipe) {
    const { Title, Boxes } = props

    return (
        <section className="recipes-container">
            <h2>{Title.toUpperCase()}</h2>
            <div className="recipes">
                {Boxes.map(box => {
                    return (
                        <RecipeBox Id={box.Id} key={box.Id} Image={box.Image} Title={box.Title} Description={box.Description} Slug={box.Slug}/>
                    )
                })}
            </div>
        </section>
    )
}
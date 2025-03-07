import RecipeBox from "./recipe-box";
import { Recipe } from "../models"

export default function RecipesContainer(props: Recipe) {
    const { title, boxes } = props

    return (
        <section className="recipes-container">
            <h2>{title.toUpperCase()}</h2>
            <div className="recipes">
                {boxes.map(box => {
                    return (
                        <RecipeBox id={box.id} key={box.id} image={box.image} title={box.title} caption={box.caption} rate={box.rate} path={box.path}/>
                    )
                })}
            </div>
        </section>
    )
}
import RecipeBox from "./recipe-box"
import { RecipeData } from "../models"

type Props = {
    boxes: RecipeData[];
}

export default function ProfileRecipesContainer(props: Props) {
    const { boxes } = props

    return (
        <div id="profile-recipes-container">
            <input type="text" placeholder="Procure por uma receita"/>
            <div>
                {boxes.map(box => {
                    return (
                        <RecipeBox key={box.id} id={box.id} image={box.image} title={box.title} caption={box.caption} slug={box.slug}/>
                    )
                })}
            </div>
        </div>
    )
}
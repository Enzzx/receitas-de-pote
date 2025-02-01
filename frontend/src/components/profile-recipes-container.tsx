import RecipeBox, { RecipeData } from "./recipe-box"

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
                        <RecipeBox id={box.id} image={box.image} title={box.title} caption={box.caption} rate={box.rate} path={box.path}/>
                    )
                })}
            </div>
        </div>
    )
}
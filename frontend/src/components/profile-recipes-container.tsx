import RecipeBox from "./recipe-box"
import { RecipeData } from "../models"

type Props = {
    boxes: RecipeData[];
}

export default function ProfileRecipesContainer(props: Props) {
    const { boxes } = props

    function filterRecipes(e: React.FormEvent<HTMLInputElement>) {
        const titles = document.querySelectorAll(".recipe-title")

        titles.forEach((title: Element) => {
            const closestLink = title.closest("a")

            if (closestLink) {
                if (title.textContent?.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) !== -1) {
                    closestLink.style.display = "block"
                } else {
                    closestLink.style.display = "none"
                }
            }
        })
    }

    return (
        <div id="profile-recipes-container">
            <input type="text" placeholder="Procure por uma receita" onInput={filterRecipes}/>
            <div>
                {boxes != null ? boxes.map(box => {
                    return (
                        <RecipeBox key={box.Id} Id={box.Id} Image={box.Image} Title={box.Title} Description={box.Description} Slug={box.Slug}/>
                    )
                }) : <><h2>Você não possui nenuma receita</h2></> }
            </div>
        </div>
    )
}
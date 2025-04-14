import { useEffect, useState } from "react";
import RecipeBox from "./recipe-box";
import { HttpRecipesBody, RecipeData } from "../models";

export default function RecipesContainer(props: { title: string }) {
    const [boxes, setBoxes] = useState<RecipeData[]>([])
    const { title } = props

    async function getRecipes() {
        try {
            const req = await fetch(import.meta.env.VITE_BACKEND_URL + "/recipes/topic?topic=" + title.toLowerCase())
            const res: HttpRecipesBody = await req.json()

            console.log(res.Message)
            if (res.Successfull) {
                setBoxes(res.Data)
            }
        } catch (e) {
            throw e
        }
    }

    useEffect(() => {
        getRecipes()
    }, [])


    return (
        <section className="recipes-container">
            <h2>{title.toUpperCase()}</h2>
            <div className="recipes">
                {boxes ? boxes.map(box => {
                    return (
                        <RecipeBox Id={box.Id} key={box.Id} Image={box.Image} Title={box.Title} Description={box.Description} Slug={box.Slug}/>
                    )
                }) : <p>não foram encontradas receitas sobre o tópico</p>}
            </div>
        </section>
    )
}
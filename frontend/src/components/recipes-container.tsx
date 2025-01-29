import RecipeBox , { RecipeData } from "./recipe-box";

type Props = {
    title: string;
    boxes: RecipeData[];
}

export default function RecipesContainer(props: Props) {
    const { title, boxes } = props

    return (
        <section className="recipes-container">
            <h2>{title.toUpperCase()}</h2>
            <div className="recipes">
                {boxes.map(box => {
                    return (
                        <RecipeBox id={box.id} image={box.image} title={box.title} caption={box.caption} rate={box.rate} path={box.path}/>
                    )
                })}
            </div>
        </section>
    )
}
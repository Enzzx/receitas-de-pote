import HomeNavbar from "../components/home-navbar"
import HomeNews from "../components/home-news"
import RecipesContainer from "../components/recipes-container"
import meals from "../data-sim/recipes-meals.json"
import pasta from "../data-sim/recipes-pasta.json"

export default function Home() {
    return (
        <>
            <HomeNavbar />
            <HomeNews />
            <RecipesContainer title={meals.title} boxes={meals.boxes}/>
            <RecipesContainer title={pasta.title} boxes={pasta.boxes}/>
        </>
    )
}
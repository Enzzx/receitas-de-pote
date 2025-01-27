import Navbar from "../components/navbar"
import HomeNews from "../components/home-news"
import RecipesContainer from "../components/recipes-container"
import FooterPage from "../components/footer-page"
import meals from "../data-sim/recipes-meals.json"
import pasta from "../data-sim/recipes-pasta.json"

export default function Home() {
    return (
        <>
            <Navbar />
            <HomeNews />
            <RecipesContainer title={meals.title} boxes={meals.boxes}/>
            <div className="img-background"><h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur.</h2></div>
            <RecipesContainer title={pasta.title} boxes={pasta.boxes}/>
            <FooterPage />
        </>
    )
}
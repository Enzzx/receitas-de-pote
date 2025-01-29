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
            <div className="img-background">
                <section></section>
                <article>
                    <h2>Title something</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo dicta nulla non quae labore repellat facilis nesciunt quod doloribus, totam sit.</p>
                </article>
            </div>
            <RecipesContainer title={pasta.title} boxes={pasta.boxes}/>
            <FooterPage />
        </>
    )
}
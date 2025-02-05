import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import HomeNews from "../components/home-news"
import RecipesContainer from "../components/recipes-container"
import SearchBar from "../components/search-bar"
import FooterPage from "../components/footer-page"
import meals from "../data-sim/recipes-meals.json"
import pasta from "../data-sim/recipes-pasta.json"

export default function Home() {
    const [backHi, setBackHi] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function serverHi() {
            try {
                const req = await fetch(import.meta.env.VITE_BACKEND_URL+"/")
                const res = await req.text()
                setBackHi(res)
            } catch (e) {
                console.log(e)
                setBackHi("sem hi :(")
            } finally {
                setLoading(false)
            }
        }
        setTimeout(() => {
            serverHi()
        }, 3000)
    }, [])

    return (
        <>
            <Navbar />
            <HomeNews />
            <RecipesContainer title={meals.title} boxes={meals.boxes}/>
            <SearchBar />
            <div className="img-background">
                <section></section>
                <article>
                    <h2>{loading ? "Tá vindo..." : backHi}</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo dicta nulla non quae labore repellat facilis nesciunt quod doloribus, totam sit.</p>
                </article>
            </div>
            <RecipesContainer title={pasta.title} boxes={pasta.boxes}/>
            <FooterPage />
        </>
    )
}
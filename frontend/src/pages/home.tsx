import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import HomeNews from "../components/home-news"
import RecipesContainer from "../components/recipes-container"
import SearchBar from "../components/search-bar"
import FooterPage from "../components/footer-page"
import { HttpAccBody } from "../models"
//import meals from "../data-sim/recipes-meals.json"
//import pasta from "../data-sim/recipes-pasta.json"

export default function Home() {
    const [backHi, setBackHi] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    async function getUsername(token: string) {
        const head = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`}
        }
        
        try {
            const req = await fetch(import.meta.env.VITE_BACKEND_URL + "/user/info", head)
            const res: HttpAccBody = await req.json()

            console.log(res.Message)
            if (res.Succesfull) {
                sessionStorage.setItem("username", res.Data)
            }
        } catch (e) {
            throw e
        }
    }

    async function serverHi() {
        try {
            const req = await fetch(import.meta.env.VITE_BACKEND_URL+"/")
            const res = await req.text()
            setBackHi(res)
        } catch (e) {
            setBackHi("A cozinha está fechada")
            throw e
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' })

        const username = sessionStorage.getItem("username")
        const jwt = Cookies.get("jwt")
        if (username == null && jwt != undefined) {
            getUsername(jwt)
        }

        setTimeout(() => {
            serverHi()
        }, 3000)
    }, [])

    return (
        <>
            <Navbar username={sessionStorage.getItem("username")}/>
            <HomeNews />
            <RecipesContainer title="Pratos típicos"/>
            <SearchBar />
            <div className="img-background">
                <section></section>
                <article>
                    <h2>{loading ? "Tá vindo..." : backHi}</h2>
                </article>
            </div>
            <RecipesContainer title="Massas"/>
            <FooterPage />
        </>
    )
}
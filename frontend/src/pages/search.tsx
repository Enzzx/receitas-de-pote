import { useSearchParams } from "react-router-dom";
import Navbar from "../components/navbar";
import SearchResultContainer from "../components/search-result-container";
import { useEffect, useRef, useState } from "react";
import { HttpSearchBody, News, RecipeData } from "../models";
import FooterPage from "../components/footer-page";
 
 
 export default function Search () {
    const [recipes, setRecipes] = useState<RecipeData[]>([])
    const [news, setNews] = useState<News[]>([])
    const [ searchParams ] = useSearchParams()
    const query = searchParams.get('query')
    const inputRef = useRef<HTMLInputElement>(null)


    async function getSearchResults(search: string) {
        try {
            const req = await fetch(import.meta.env.VITE_BACKEND_URL + "/search?query="+search)
            const res: HttpSearchBody = await req.json()

            console.log(res)
            if (res.Successfull) {
                setRecipes(res.Data.recipes)
                setNews(res.Data.news)
            }
        } catch (e) {
            throw e
        }
    }


    useEffect(() => {
        if (inputRef.current) {
            query != null ? inputRef.current.value = query : null
        }

        if (query != null) {
            getSearchResults(query)
        }

    }, [])

    return (
        <>
        <Navbar username={sessionStorage.getItem("username")}/>

        {query != null && (
            <>
            <section className="search-result">
                <h2>Resultado para a pesquisa</h2>
                <form action="/search" method="get" className="search-bar-container-search">
                    <input name="search" type="search" ref={inputRef}/>
                    <button type="submit"><img src="./icons/search.png" alt="search" /></button>
                </form>
            </section>
            <SearchResultContainer recipes={recipes} news={news} />
            </>
        )}
        {query == null && (
            <section className="search-result" style={{minHeight: '60vh'}}>
                <h1>Pesquise algo para encontrar resultados</h1>
            </section>
        )}

        <FooterPage />
        </>
    )
}
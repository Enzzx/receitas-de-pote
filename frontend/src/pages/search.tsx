import Navbar from "../components/navbar";
import SearchResultContainer from "../components/search-result-container";
 
 
 export default function Search () {
    return (
        <>
        <Navbar username={sessionStorage.getItem("username")}/>
        <section className="search-result">
            <h2>Resultado para a pesquisa</h2>
            <form action="/search" method="get" className="search-bar-container-search">
                <input name="search" type="search"/>
                <button type="submit"><img src="./icons/search.png" alt="search" /></button>
            </form>
        </section>
        <SearchResultContainer recipes={[]} news={[]} />
        </>
    )
}
import { Link } from "react-router-dom"

export default function SearchBar() {
    return (
        <div className="search-bar-container">
            <section className="search-bar-section">
                <h3>O que quer cozinhar agora?</h3>
                <form action="/search" method="get"className="search-bar-container-search">
                    <input name="query" type="search"  placeholder="Pesquise uma receita ou ingrediente"/>
                    <button type="submit"><img src="./icons/search.png" alt="search" /></button>
                </form>
            </section>
            <section className="search-bar-options">
                <h4>Sugestões</h4>
                <div>
                    <Link to={'/search?query=frango'}>Frango</Link>
                    <Link to={'/search?query=lasanha'}>Lasanha</Link>
                    <Link to={'/search?query=pao-de-batata'}>Pão de batata</Link>
                    <Link to={'/search?query=panqueca'}>Panqueca</Link>
                    <Link to={'/search?query=torta'}>Torta</Link>
                    <Link to={'/search?query=carne-moida'}>Carne moída</Link>
                    <Link to={'/search?query=batata-amassada'}>Batata amassada</Link>
                </div>
            </section>
        </div>
    )
}
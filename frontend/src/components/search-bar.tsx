export default function SearchBar() {
    return (
        <div className="search-bar-container">
            <section className="search-bar-section">
                <h3>O que quer cozinhar agora?</h3>
                <form action="/search" method="get"className="search-bar-container-search">
                    <input name="search" type="search"  placeholder="Pesquise uma receita ou ingrediente"/>
                    <button type="submit"><img src="./icons/search.png" alt="search" /></button>
                </form>
            </section>
            <section className="search-bar-options">
                <h4>Sugestões</h4>
                <div>
                    <a href="">Frango</a>
                    <a href="">Lasanha</a>
                    <a href="">Pão de batata</a>
                    <a href="">Panqueca</a>
                    <a href="">Torta</a>
                    <a href="">Carne moída</a>
                    <a href="">Batata amassada</a>
                </div>
            </section>
        </div>
    )
}
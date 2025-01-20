export default function HomeNavbar() {
    return (
        <nav>
            <section>
                <div className="menu-hamburguer">hamburguer</div>
                <form id="search-bar">
                    <input type="search" name="q" placeholder="pesquise uma receita"/>
                    <button type="submit"><img src="./icons/search.png" alt="search" /></button>
                </form>
                <div className="pfp">
                    <img src="./icons/account.png" alt="pfp" />
                    <p>username</p>
                </div>
            </section>
            <ul>
                <li>café da manhã</li>
                <li>lanches</li>
                <li>pratos típicos</li>
                <li>tradicional</li>
                <li>vegetarianos</li>
                <li>salgados</li>
                <li>sobremesas</li>
            </ul>
        </nav>
    )
}
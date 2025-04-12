import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Navbar({ username }: { username: string | null }) {
    const [isShrunk, setIsShrunk] = useState<boolean>(false)
    const mobile: boolean = window.innerWidth < 650

    useEffect(() => {
        const home: any = document.querySelector("main")

        let previousScrollTop = 0
        const handleScroll = () => {
            window.requestAnimationFrame(() => {
                const currentScrollTop = home.scrollTop
    
                if (currentScrollTop > 100 && previousScrollTop <= 100) {
                    setIsShrunk(true)
                } else if (currentScrollTop <= 60 && previousScrollTop > 60) {
                    setIsShrunk(false)
                }
    
                previousScrollTop = currentScrollTop
            })
        }

        home.addEventListener('scroll', handleScroll)

        return () => home.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={isShrunk || mobile ? "shrink" : ""}>
            <section>
                <img src="./icons/menu.png" alt="menu" className="hide"/>
                <form action="/search" method="get" className="search-bar">
                    <input name="query" type="search" placeholder="pesquise uma receita"/>
                    <button type="submit" className={mobile ? "hide" : ""}><img src="./icons/search.png" alt="search" /></button>
                </form>
                <Link to={username != null ? '/account' : '/login'} className="pfp">
                    <img src="./icons/account.png" alt="pfp" />
                    <p className={mobile ? "hide" : ""}>{username != null ? username : 'Conecte-se'}</p>
                </Link>
            </section>
            <ul className={isShrunk || mobile ? "hide": ""}>
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
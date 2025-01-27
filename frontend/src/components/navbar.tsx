import { useEffect, useState } from "react"

export default function Navbar() {
    const [isShrunk, setIsShrunk] = useState<boolean>(false)

    //shrink and unshrink the navbar
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
        <nav className={isShrunk ? "shrink" : ""}>
            <section>
                <img src="./icons/menu.png" alt="menu" />
                <form id="search-bar">
                    <input type="search" name="q" placeholder="pesquise uma receita"/>
                    <button type="submit"><img src="./icons/search.png" alt="search" /></button>
                </form>
                <div className="pfp">
                    <img src="./icons/account.png" alt="pfp" />
                    <p>username</p>
                </div>
            </section>
            <ul className={isShrunk ? "hide-nav-ul": ""}>
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
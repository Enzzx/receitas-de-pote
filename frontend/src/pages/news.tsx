import Navbar from "../components/navbar"
import NewsMain from "../components/news-main"
import SearchBar from "../components/search-bar"
import NewsContainer from "../components/news-container"
import FooterPage from "../components/footer-page"
import { useEffect } from "react"

export default function News() {
    
    useEffect(() => {
        document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    return (
        <>
            <Navbar username={sessionStorage.getItem("username")}/>
            <NewsMain />
            <SearchBar />
            <NewsContainer />
            <FooterPage />
        </>
    )
}
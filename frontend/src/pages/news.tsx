import Navbar from "../components/navbar"
import NewsMain from "../components/news-main"
import SearchBar from "../components/search-bar"
import NewsContainer from "../components/news-container"
import FooterPage from "../components/footer-page"

export default function News() {
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
//import news from "../data-sim/news.json"
import NewsBox from "../components/news-box"
import { useEffect, useState } from "react"
import { HttpNewsBody, News } from "../models"

export default function NewsContainer() {
    const [news, setNews] = useState<News[]>([])

    async function getNews() {
        const head = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }

        try {
            const req = await fetch(import.meta.env.VITE_BACKEND_URL + "/news/page", head)
            const res: HttpNewsBody = await req.json()

            console.log(res.Message)
            if (res.Successfull) {
                setNews(res.Data)
            }

        } catch (e) {
            throw e
        }
    }

    useEffect(() => {
        getNews()
    }, [])

    return (
        <div className="news-container">
            {news.map(noticia => {
                return (
                    <NewsBox key={noticia.Id} Id={noticia.Id} Title={noticia.Title} Description={noticia.Description} Image={noticia.Image} Topic={noticia.Topic} Publication={noticia.Publication} />
                )
            })}
        </div>
    )
}
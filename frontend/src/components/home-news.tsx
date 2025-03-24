import { useEffect, useState } from "react"
import { HttpNewsBody, News } from "../models"
//import news from "../data-sim/home-news.json"

export default function HomeNews() {

    const [mainNews, setMainNews] = useState<News | null>(null)
    const [otherNews, setOtherNews] = useState<News[]>([])

    async function getLastNews() {
        const head = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }

        try {
            const req = await fetch(import.meta.env.VITE_BACKEND_URL + "/news/last", head)
            const res: HttpNewsBody = await req.json()

            if (res.Successfull) {
                if (res.Data.length > 0) {
                    setMainNews(res.Data[0])
                    setOtherNews(res.Data.slice(1))
                }
            }
        } catch (e) {
            throw e
        }
    }


    useEffect(() => {
        getLastNews()
    }, [])

    //count the post date to present date
    function getTimeFromDate(date: string): string {
        //console.log(date)
        const postDate: Date = new Date(date)
        const now: Date = new Date()
        let diff: number = now.getTime() - postDate.getTime()

        diff = Math.floor(diff / (1000 * 60 * 60 * 24))

        return `há ${diff.toString()} dias`
    }

    if (!mainNews) {
        return <p>Carregando...</p>
    }

    return (
        <section id="home-news">
            <article className="main-news">
                <a href="#">
                    <img src={mainNews.Image != "" ? mainNews.Image : "https://placehold.co/600x400"} alt="main's news thumb"/>
                    <h2>{mainNews.Title}</h2>
                    <p>{mainNews.Description}</p>
                </a>
            </article>
            <section className="other-news">
                <h3>Últimas notícias</h3>
                {otherNews.map(noticia => (
                    <a href="#" key={noticia.Id}>
                        <img src={noticia.Image != "" ? noticia.Image : "https://placehold.co/600x400"} alt="news thumb" />
                        <div className="home-news-box-info">
                            <h4>{noticia.Title}</h4>
                            <aside>
                                <p>{noticia.Topic}</p>
                                <p>{getTimeFromDate(noticia.Publication)}</p>
                            </aside>
                        </div>
                    </a>
                ))}
                <button>Mais notícias</button>
            </section>
        </section>
    )
}
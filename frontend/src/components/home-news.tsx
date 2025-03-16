import { useEffect, useState } from "react"
import news from "../data-sim/home-news.json"
import { News } from "../models"

export default function HomeNews() {
    const [mainNews, setMainNews] = useState<News | null>(null)
    const [otherNews, setOtherNews] = useState<News[]>([])

    useEffect(() => {
        if (news.length > 0) {
            setMainNews(news[0])
            setOtherNews(news.slice(1))
        }
    }, [])

    //count the post date to present date
    function getTimeFromDate(date: string): string {
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
                <a href={mainNews.Path}>
                    <img src={mainNews.Image} alt="main's news thumb"/>
                    <h2>{mainNews.Title}</h2>
                    <p>{mainNews.Caption}</p>
                </a>
            </article>
            <section className="other-news">
                <h3>Últimas notícias</h3>
                {otherNews.map(noticia => (
                    <a href={noticia.Path} key={noticia.Id}>
                        <img src={noticia.Image} alt="news thumb" />
                        <div className="home-news-box-info">
                            <h4>{noticia.Title}</h4>
                            <aside>
                                <p>{noticia.Topic}</p>
                                <p>{getTimeFromDate(noticia.Post_date)}</p>
                            </aside>
                        </div>
                    </a>
                ))}
                <button>Mais notícias</button>
            </section>
        </section>
    )
}
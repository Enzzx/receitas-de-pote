import { useEffect, useState } from "react"
import news from "../data-sim/home-news.json"

type Noticia = {
    id: number;
    title: string;
    caption: string;
    image: string;
    topic: string;
    post_date: string;
    path: string;
}

export default function HomeNews() {
    const [mainNews, setMainNews] = useState<Noticia | null>(null)
    const [otherNews, setOtherNews] = useState<Noticia[]>([])

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
        <div id="home-news">
            <article className="main-news">
                <a href={mainNews.path}>
                    <img src={mainNews.image} alt="imagem da notícia"/>
                    <h2>{mainNews.title}</h2>
                    <p>{mainNews.caption}</p>
                </a>
            </article>
            <section className="other-news">
                <h3>Últimas notícias</h3>
                {otherNews.map(noticia => (
                    <a href={noticia.path} key={noticia.id}>
                        <img src={noticia.image} alt="imagem da notícia" />
                        <div className="news-box-info">
                            <h4>{noticia.title}</h4>
                            <aside>
                                <p>{noticia.topic}</p>
                                <p>{getTimeFromDate(noticia.post_date)}</p>
                            </aside>
                        </div>
                    </a>
                ))}
                <button>Mais notícias</button>
            </section>
        </div>
    )
}
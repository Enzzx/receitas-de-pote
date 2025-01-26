import { useEffect, useState } from "react"
import news from "../data-sim/home-news.json"

type Noticia = {
    id: number;
    titulo: string;
    descricao: string;
    imagem: string;
    topico: string;
    data_postagem: string;
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
                    <img src={mainNews.imagem} alt="imagem da notícia"/>
                    <h2>{mainNews.titulo}</h2>
                    <p>{mainNews.descricao}</p>
                </a>
            </article>
            <section className="other-news">
                <h3>Últimas notícias</h3>
                {otherNews.map(noticia => (
                    <a href={noticia.path} key={noticia.id}>
                        <img src={noticia.imagem} alt="imagem da notícia" />
                        <div className="news-box-info">
                            <h4>{noticia.titulo}</h4>
                            <aside>
                                <p>{noticia.topico}</p>
                                <p>{getTimeFromDate(noticia.data_postagem)}</p>
                            </aside>
                        </div>
                    </a>
                ))}
                <button>Mais notícias</button>
            </section>
        </div>
    )
}
import { useEffect, useState } from "react"
import news from "../data-sim/home-news.json"

type Noticia = {
    id: number;
    titulo: string;
    descricao: string;
    imagem: string;
    topico: string;
    data_postagem: string;
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

    if (!mainNews) {
        return <p>Carregando...</p>
    }

    return (
        <div id="home-news">
            <article className="main-news">
                <img src={mainNews.imagem} />
                <h2>{mainNews.titulo}</h2>
                <p>{mainNews.descricao}</p>
            </article>
            <section className="other-news">
                {otherNews.map(noticia => (
                    <ul key={noticia.id}>
                        <li>{noticia.id}</li>
                        <li>{noticia.imagem}</li>
                        <li>{noticia.titulo}</li>
                        <li>{noticia.descricao}</li>
                        <li>{noticia.topico}</li>
                        <li>{noticia.data_postagem}</li>
                    </ul>
                ))}
            </section>
        </div>
    )
}
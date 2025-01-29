import news from "../data-sim/news.json"
import NewsBox from "../components/news-box"

export default function NewsContainer() {
    return (
        <div className="news-container">
                {news.map(noticia => {
                    return (
                        <NewsBox id={noticia.id} title={noticia.title} caption={noticia.caption} image={noticia.image} topic={noticia.topic} post_date={noticia.post_date} path={noticia.path}/>
                    )
                })}
            </div>
    )
}
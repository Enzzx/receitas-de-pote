import news from "../data-sim/news.json"
import NewsBox from "../components/news-box"

export default function NewsContainer() {
    return (
        <div className="news-container">
            {news.map(noticia => {
                return (
                    <NewsBox key={noticia.Id} Id={noticia.Id} Title={noticia.Title} Caption={noticia.Caption} Image={noticia.Image} Topic={noticia.Topic} Post_date={noticia.Post_date} Path={noticia.Path} />
                )
            })}
        </div>
    )
}
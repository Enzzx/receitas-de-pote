import { Link } from "react-router-dom"
import { getTimeFromDate, News } from "../models"

export default function NewsBox(props: News) {
    let { Title, Image, Topic, Publication } = props

    return (
        <Link to="#" className="news-box">
            <img src={Image} alt="news thumb" />
            <div className="news-box-info">
                <aside>
                    <p className="topic-tag">{Topic}</p>
                    <p className="topic-tag">{getTimeFromDate(Publication)}</p>
                </aside>
                <h4>{Title}</h4>
            </div>
        </Link>
    )
}
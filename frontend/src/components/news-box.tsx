import { Link } from "react-router-dom"
import { News } from "../models"

export default function NewsBox(props: News) {
    let { Title, Image, Topic, Publication } = props

    function getTimeFromDate(date: string): string {
        const postDate: Date = new Date(date)
        const now: Date = new Date()
        let diff: number = now.getTime() - postDate.getTime()
        
        diff = Math.floor(diff / (1000 * 60 * 60 * 24))

        return `Há ${diff.toString()} horas`
    }

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
export type News = {
    id: number;
    title: string;
    caption: string;
    image: string;
    topic: string;
    post_date: string;
    path: string;
}

export default function NewsBox(props: News) {
    let { title, image, topic, post_date, path } = props

    function getTimeFromDate(date: string): string {
        const postDate: Date = new Date(date)
        const now: Date = new Date()
        let diff: number = now.getTime() - postDate.getTime()
        
        diff = Math.floor(diff / (1000 * 60 * 60 * 24))

        return `Há ${diff.toString()} horas`
    }

    return (
        <a href={path} className="news-box">
            <img src={image} alt="news thumb" />
            <div className="news-box-info">
                <aside>
                    <p>{topic}</p>
                    <p>{getTimeFromDate(post_date)}</p>
                </aside>
                <h4>{title}</h4>
            </div>
        </a>
    )
}
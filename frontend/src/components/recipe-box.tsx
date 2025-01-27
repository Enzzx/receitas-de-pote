export type BoxData = {
    id: number;
    image: string;
    title: string;
    caption: string;
    rate: number;
    path: string;
}

export default function RecipeBox(props: BoxData) {
    let { image, title, caption, rate, path } = props

    function reticence(str: string): string {
        if (str.length <= 80) return str

        str = str.slice(0, 80)
        while(/[^a-zA-Z0-9]$/.test(str)) {
            str = str.slice(0, -1)
        }

        return str + "..."
    }

    return (
        <a href={path} className="recipe-box">
            <img src={image} alt={title} />
            <div className="recipe-box-info">
                <h3>{title}</h3>
                <p>{reticence(caption)}</p>
                <p>{rate}</p>
            </div>
        </a>
    )
}
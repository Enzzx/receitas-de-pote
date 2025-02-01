export type ProfileInfo = {
    id: number;
    img: string;
    username: string;
    recipes: number;
    news: number;
}

export default function ProfileInfo(props: ProfileInfo) {
    const { img, username, recipes, news } = props

    return (
        <div id="profile-info">
            <img src={img} alt="profile pic" />
            <section id="profile-data">
                <h3>{username}</h3>
                <button>Edit profile</button>
                <section className="profile-count">
                    <p>Recipes: {recipes}</p>
                    <p>News: {news}</p>
                </section>
            </section>
        </div>
    )
}
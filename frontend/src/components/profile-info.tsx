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
                <button>Editar perfil</button>
                <section className="profile-count">
                    <p>Receitas: {recipes}</p>
                    <p>Notícias: {news}</p>
                </section>
            </section>
            <div id="profile-sys">
                <button>sair da conta</button>
                <button>apagar conta</button>
            </div>
        </div>
    )
}
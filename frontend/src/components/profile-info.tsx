import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { UserProfile, HttpAccBody } from "../models"

export default function ProfileInfo(props: UserProfile) {
    const { img, username, recipes, news } = props
    const navigate = useNavigate()

    function clearLogin() {
        sessionStorage.clear()
        Cookies.remove("jwt")
        navigate("/")
    }

    async function deleteAcc() {
        const head = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sessionStorage.getItem("username"))
        }

        try {
            const req = await fetch(import.meta.env.VITE_BACKEND_URL + "/user/delete", head)
            const res: HttpAccBody = await req.json()

            if (res.Succesfull) {
                alert(res.Message)
                clearLogin()
            }

        } catch (e) {
            throw e
        }
    }

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
                <button onClick={clearLogin}>sair da conta</button>
                <button onClick={deleteAcc}>apagar conta</button>
            </div>
        </div>
    )
}
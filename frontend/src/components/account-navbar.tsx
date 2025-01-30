import { NavLink } from "react-router-dom"

export default function AccountNavbar() {
    return (
        <ul id="account-nav">
            <li><NavLink to="">Perfil</NavLink></li>
            <li><NavLink to="recipes">Receitas</NavLink></li>
            <li><NavLink to="news">Notícias</NavLink></li>
        </ul>
    )
}
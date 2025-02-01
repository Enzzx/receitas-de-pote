import { NavLink } from "react-router-dom"

export default function AccountNavbar() {
    return (
        <ul id="account-nav">
            <NavLink to="" className={({ isActive }) => (isActive ? "active-acc-nav" : "")} end><li>Perfil</li></NavLink>
            <NavLink to="favorites" className={({ isActive }) => (isActive ? "active-acc-nav" : "")}><li>Favoritos</li></NavLink>
        </ul>
    )
}
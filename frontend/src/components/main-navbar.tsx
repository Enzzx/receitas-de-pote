import { NavLink } from "react-router-dom";

export default function MainNavbar() {
    return (
        <ul>
            <li><NavLink to="/list" end>Lista</NavLink></li>
            <li><NavLink to="/news" end>News</NavLink></li>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/profile" end>Perfil</NavLink></li>
            <li><NavLink to="/about" end>Sobre</NavLink></li>
        </ul>
    )
}
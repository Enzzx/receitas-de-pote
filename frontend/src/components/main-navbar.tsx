import { NavLink } from "react-router-dom";

export default function MainNavbar() {
    return (
        <ul>
            <li><NavLink to="/"><img src="/logo.png" alt="Logo" /></NavLink></li>
            <li className="hide"><NavLink to="/list" className={({ isActive }) => (isActive ? "active-page" : "")} end><img src="/icons/to-do.png" alt="to-do list" /> <span>Lista</span></NavLink></li>
            <li><NavLink to="/news" className={({ isActive }) => (isActive ? "active-page" : "")} end><img src="/icons/news.png" alt="news" /> <span>News</span></NavLink></li>
            <li><NavLink to="/" className={({ isActive }) => (isActive ? "active-page" : "")} end><img src="/icons/home.png" alt="home" /> <span>Home</span></NavLink></li>
            <li><NavLink to="/account" className={({ isActive }) => (isActive ? "active-page" : "")}><img src="/icons/user.png" alt="profile" /> <span>Conta</span></NavLink></li>
            <li className="hide"><NavLink to="/about" className={({ isActive }) => (isActive ? "active-page" : "")} end><img src="/icons/info.png" alt="info" /> <span>Sobre</span></NavLink></li>
        </ul>
    )
}
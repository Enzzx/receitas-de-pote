import { NavLink } from "react-router-dom";

export default function MainNavbar() {
    return (
        <ul>
            <li><NavLink to="/"><img src="/" alt="Logo" /></NavLink></li>
            <li><NavLink to="/list" end><img src="./icons/to-do.png" alt="to-do list" /> Lista</NavLink></li>
            <li><NavLink to="/news" end><img src="./icons/to-do.png" alt="news" /> News</NavLink></li>
            <li><NavLink to="/" end><img src="./icons/home.png" alt="home" /> Home</NavLink></li>
            <li><NavLink to="/profile" end><img src="./icons/user.png" alt="profile" /> Conta</NavLink></li>
            <li><NavLink to="/about" end><img src="./icons/to-do.png" alt="about" /> Sobre</NavLink></li>
        </ul>
    )
}
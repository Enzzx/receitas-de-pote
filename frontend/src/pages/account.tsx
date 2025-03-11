import { Outlet, Link } from "react-router-dom"
import AccountNavbar from "../components/account-navbar"

export default function Account() {
    const isLogged = typeof(sessionStorage.getItem("username")) == typeof("a") ? true : false
    return (
        <> 
        {
            isLogged ? 
            <>
                <AccountNavbar />
                <Outlet />
            </> :
            <div className="to-login-message">
                <p>Conecte-se agora em uma conta para acessar seu perfil</p>
                <Link to={"/login"}><button>Entrar</button></Link><br />
                <Link to={"/signin"}><button>Criar conta</button></Link>
            </div>
        }
        </>
    )
}
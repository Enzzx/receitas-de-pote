import { Outlet } from "react-router-dom"
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
            </>
            : <div>conecte se em uma cobnta</div>
        }
        </>
    )
}
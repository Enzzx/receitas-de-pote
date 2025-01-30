import { Outlet } from "react-router-dom"
import AccountNavbar from "../components/account-navbar"

export default function Account() {
    return (
        <>
            <AccountNavbar />
            <Outlet />
        </>
    )
}
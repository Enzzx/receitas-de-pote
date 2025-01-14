import { Outlet } from "react-router-dom";
import MainNavbar from "./components/main-navbar.tsx"

export default function App() {
    return (
        <>
            <header><MainNavbar/></header>
            <main><Outlet /></main>
        </>
    )
}
import { Outlet } from "react-router-dom";
import MainNavbar from "./components/main-navbar.tsx"
import "./styles/App.css"

export default function App() {
    return (
        <>
            <header><MainNavbar/></header>
            <main><Outlet /></main>
            <footer>Logo</footer>
        </>
    )
}
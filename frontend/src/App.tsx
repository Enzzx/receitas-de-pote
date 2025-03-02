import { Outlet } from "react-router-dom";
import MainNavbar from "./components/main-navbar.tsx"
import "./styles/App.css"

export default function App() {

    document.body.style.height = `${window.innerHeight}`
    
    return (
        <>
            <header><MainNavbar/></header>
            <main><Outlet /></main>
            <footer><img src="logo.png" alt="logo" /></footer>
        </>
    )
}
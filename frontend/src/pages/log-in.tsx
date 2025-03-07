import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { HttpAccBody } from "../models"

export default function LogIn() {
    const [errMessage, setErrMessage] = useState<string | undefined>()
    const navigate = useNavigate()

    // login and store jwt in cookies
    async function loginSubmit(e: React.FormEvent) {
        e.preventDefault()
        
        const username = (document.querySelector("#login-username") as HTMLInputElement)?.value
        const password = (document.querySelector("#login-password") as HTMLInputElement)?.value
        
        const head = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        }

        try {
            const req = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", head)
            const res: HttpAccBody = await req.json()

            console.log(res.Message)
            if (res.Succesfull) {
                Cookies.set("jwt", res.Data, { expires: 7})
                sessionStorage.clear()
                navigate("/")
            } else {
                setErrMessage(res.Message)
            }
        } catch (err) {
            throw err
        }
    }

    return (
        <div id="login-page">
            <div className="login-background"></div>
            <div>
                <form id="login-form" onSubmit={loginSubmit}>
                    <section>
                        <label htmlFor="login-username">Nome:</label><br />
                        <input type="text" id="login-username" placeholder="Insira seu nome" 
                        required />
                    </section>
                    <section>
                        <label htmlFor="login-password">Senha:</label><br />
                        <input type="text" id="login-password" placeholder="Insira sua senha" 
                        required />
                    </section>
                    <p>{typeof(errMessage) != undefined ? errMessage : ""}</p>
                    <section>
                        <input type="submit" value="Entrar" />
                        <p>Não possui uma conta? crie uma <Link to="../signin">agora</Link></p>
                    </section>
                </form>
            </div>
        </div>
    )
}
import React, { useState } from "react";
import { Link } from "react-router-dom"

type HttpAccBody = {
    Message: string
    Succesfull: boolean
    Data: string
}

export default function LogIn() {

    async function loginSubmit(e: React.FormEvent) {
        e.preventDefault()

        const username = (document.querySelector("#login-username") as HTMLInputElement)?.value
        const password = (document.querySelector("#login-password") as HTMLInputElement)?.value

        const head = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include" as RequestCredentials,
            body: JSON.stringify({ username, password })
        }

        try {
            const req = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", head)
            const res: HttpAccBody = await req.json()

            console.log(res.Message)
            if (res.Succesfull) {
                console.log("sucesso")
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
                        <input type="text" id="login-username" placeholder="Insira seu nome" />
                    </section>
                    <section>
                        <label htmlFor="login-password">Senha:</label><br />
                        <input type="text" id="login-password" placeholder="Insira sua senha" />
                    </section>
                    <section>
                        <input type="submit" value="Entrar" />
                        <p>Não possui uma conta? crie uma <Link to="../signin">agora</Link></p>
                    </section>
                </form>
            </div>
        </div>
    )
}
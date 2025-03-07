import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { HttpAccBody } from "../models"

export default function SignIn() {
    const [errMessage, setErrMessage] = useState<string | undefined>()
    const navigate = useNavigate()

    async function signinSubmit(e: React.FormEvent) {
        e.preventDefault()

        const username = (document.querySelector("#signin-username") as HTMLInputElement)?.value
        const password = (document.querySelector("#signin-password") as HTMLInputElement)?.value
        const passwordRepeat = (document.querySelector("#signin-password-repeat") as HTMLInputElement)?.value

        const head = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        }

        if (password === passwordRepeat) {
            try {
                const req = await fetch(import.meta.env.VITE_BACKEND_URL + "/signin", head)
                const res: HttpAccBody = await req.json()

                if (res.Succesfull) {
                    alert("Conta criada com êxito")
                    navigate("/login")
                } else {
                    setErrMessage(res.Message)
                }
            } catch (e) {
                throw e
            }
        } else {
            setErrMessage("senhas diferentes")
        }
    }

    return (
        <div id="signin-page">
            <div className="signin-background"></div>
            <div>
                <form id="signin-form" onSubmit={signinSubmit}>
                    <section>
                        <label htmlFor="signin-username">Nome:</label><br />
                        <input type="text" id="signin-username" placeholder="Insira um nome"
                        required/>
                    </section>
                    <section>
                        <label htmlFor="signin-password">Senha:</label><br />
                        <input type="text" id="signin-password" placeholder="Insira uma senha"
                        required/>
                    </section>
                    <section>
                        <label htmlFor="signin-password-repeat">Confirme a senha:</label><br />
                        <input type="text" id="signin-password-repeat" placeholder="Repita a senha"
                        required/>
                    </section>
                    <p>{typeof(errMessage) != undefined ? errMessage : ""}</p>
                    <input type="submit" value="Criar conta" />
                </form>
            </div>
        </div>
    )
}
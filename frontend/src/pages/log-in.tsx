import { Link } from "react-router-dom"

export default function LogIn() {
    return (
        <div id="login-page">
            <div className="login-background"></div>
            <div>
                <form id="login-form">
                    <section>
                        <label htmlFor="login-username">Nome:</label><br />
                        <input type="text" id="login-username" placeholder="Insira seu nome"/>
                    </section>
                    <section>
                        <label htmlFor="login-password">Senha:</label><br />
                        <input type="text" id="login-password" placeholder="Insira sua senha"/>
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
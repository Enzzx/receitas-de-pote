export default function SignIn() {
    return (
        <div id="signin-page">
            <div className="signin-background"></div>
            <div>
                <form id="signin-form">
                    <section>
                        <label htmlFor="signin-username">Nome:</label><br />
                        <input type="text" id="signin-username" placeholder="Insira um nome"/>
                    </section>
                    <section>
                        <label htmlFor="signin-password">Senha:</label><br />
                        <input type="text" id="signin-password" placeholder="Insira uma senha"/>
                    </section>
                    <section>
                        <label htmlFor="signin-password-repeat">Confirme a senha:</label><br />
                        <input type="text" id="signin-password-repeat" placeholder="Repita a senha"/>
                    </section>
                    <input type="submit" value="Criar conta" />
                </form>
            </div>
        </div>
    )
}
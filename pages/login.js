import { useEffect, useState } from 'react'
import { login } from '../src/services/LoginService'
import { useRouter } from 'next/router'

export default function LoginPage () {
  const router = useRouter()
  const [user, setUser] = useState('')
  const [erro, setErro] = useState('')
  useEffect(() => {
    console.log(router.query)
    if (router.query.limit === 'true') {
      setErro('Limite de requisições excedido. Aguarde para tentar novamente.')
    } else if (router.query.exists === 'false') {
      setErro('Usuário não encontrado')
    }
  }, [router.query])

  return (<main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <div className="loginScreen">
    <section className="logoArea">
      <img src="https://alurakut.vercel.app/logo.svg" />
      <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
      <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
      <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
    </section>

    <section className="formArea">
      <form className="box" onSubmit= { async (e) => {
        e.preventDefault()
        if (!user) {
          setErro('Informe um nome de usuário')
          return
        }

        await login(user)
        router.push('/')
      }}>
        <p>
          Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
      </p>
        <input
            style={{ marginBottom: '1px' }}
            placeholder="Usuário"
            value={user}
            onChange={(evento) => {
              setUser(evento.target.value)
            }}
        />
        <span style={{ minHeight: '20px', fontSize: '0.8em', color: 'red' }}>{ erro }</span>

        <button type="submit">
          Login
        </button>
      </form>

      <footer className="box">
        <p>
          Ainda não é membro? <br />
          <a href="/login">
            <strong>
              ENTRAR JÁ
          </strong>
          </a>
        </p>
      </footer>
    </section>

    <footer className="footerArea">
      <p>
        © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
      </p>
    </footer>
  </div>
</main>)
}

import { setUserToken, removeUserToken, getUserToken } from './CookiesStore'
import jwt from 'jsonwebtoken'

const LOGIN_URL = 'https://alurakut.vercel.app/api/login'
const CHECK_AUTH_URL = 'https://alurakut.vercel.app/api/auth'

const config = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

export const login = async (user) => {
  const res = await fetch(LOGIN_URL, {
    ...config,
    body: JSON.stringify({ githubUser: user })
  })
  const { token } = await res.json()
  setUserToken(token)
}

export const logout = () => {
  removeUserToken()
}

export const getAuthenticatedUser = async (context) => {
  const token = getUserToken(context)
  const res = await fetch(CHECK_AUTH_URL, {
    headers: {
      Authorization: token
    }
  })
  const { isAuthenticated } = await res.json()
  const { githubUser } = jwt.decode(token) || {}
  const { status } = await fetch(`https://api.github.com/users/${githubUser}`)
  return {
    isAuthenticated,
    githubUser,
    exists: status === 200,
    limit: status === 403
  }
}

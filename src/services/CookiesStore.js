import nookies from 'nookies'

const USER_TOKEN_KEY = 'USER_TOKEN'

export const setUserToken = (token) => {
  nookies.set(null, USER_TOKEN_KEY, token, {
    path: '/',
    maxAge: 86400 * 7
  })
}

export const removeUserToken = (context) => {
  nookies.destroy(context, USER_TOKEN_KEY)
}

export const getUserToken = (context) => {
  const cookies = nookies.get(context)
  return cookies[USER_TOKEN_KEY]
}

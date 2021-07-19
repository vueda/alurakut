import { removeUserToken } from '../src/services/CookiesStore'

export async function getServerSideProps (context) {
  removeUserToken(context)
  return {
    redirect: {
      destination: '/login',
      permanent: false
    }
  }
}

export default function LogoutPage () {
  return (<p>Saindo...</p>)
}

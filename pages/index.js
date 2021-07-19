import PropTypes from 'prop-types'
import { useState } from 'react'
import { AlurakutLayout } from '../src/components/layout/AlurakutLayout'
import { ProfileBox } from '../src/components/ProfileBox'
import { WelcomeBox } from '../src/components/WelcomeBox'
import { CommunityForm } from '../src/components/CommunityForm'
import { RelationsBox } from '../src/components/RelationsBox'
import { getAuthenticatedUser } from '../src/services/LoginService'
import { getUserData } from '../src/services/UserService'

export async function getServerSideProps (context) {
  const { githubUser, isAuthenticated, exists, limit } = await getAuthenticatedUser(context)
  if (!isAuthenticated || !exists || limit) {
    return {
      redirect: {
        destination: `/login?exists=${exists}&limit=${limit}`,
        permanent: false
      }
    }
  }

  const data = await getUserData(githubUser)
  return {
    props: {
      ...data
    }
  }
}

export default function HomePage ({ githubUser, stats, followers, communities }) {
  const [comm, setCommunities] = useState(communities)
  return (
    <AlurakutLayout
      user={githubUser}
      left={<ProfileBox user={githubUser} />}
      center={<>
        <WelcomeBox stats={stats} />
        <CommunityForm communities={comm} setCommunities={setCommunities} />
      </>}
      right={<>
        <RelationsBox title="Seguidores" relations={followers} />
        <RelationsBox title="Comunidades" relations={comm} />
      </>}
    />
  )
}
HomePage.propTypes = {
  githubUser: PropTypes.string,
  stats: PropTypes.object,
  followers: PropTypes.array,
  communities: PropTypes.array
}

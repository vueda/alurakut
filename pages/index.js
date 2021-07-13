import PropTypes from 'prop-types'
import { useState } from 'react'
import { AlurakutLayout } from '../src/components/layout/AlurakutLayout'
import { ProfileBox } from '../src/components/ProfileBox'
import { WelcomeBox } from '../src/components/WelcomeBox'
import { CommunityForm } from '../src/components/CommunityForm'
import { RelationsBox } from '../src/components/RelationsBox'

export async function getServerSideProps () {
  const githubUser = 'vueda'
  const res = await fetch(`https://api.github.com/users/${githubUser}/followers`)
  const followers = await res.json()
  return {
    props: {
      githubUser,
      followers: followers.map(f => ({ id: f.login, image: `https://github.com/${f.login}.png` })),
      stats: { confiavel: 3, legal: 2, sexy: 1 }
    }
  }
}

export default function Home ({ githubUser, stats, followers }) {
  const [communities, setCommunities] = useState([{ id: 'Eu odeio acordar cedo', image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg' }])
  return (
    <AlurakutLayout
      user={githubUser}
      left={<ProfileBox user={githubUser} />}
      center={<>
        <WelcomeBox stats={stats} />
        <CommunityForm communities={communities} setCommunities={setCommunities} />
      </>}
      right={<>
        <RelationsBox title="Seguidores" relations={followers} />
        <RelationsBox title="Comunidades" relations={communities} />
      </>}
    />
  )
}
Home.propTypes = {
  githubUser: PropTypes.string,
  stats: PropTypes.object,
  followers: PropTypes.array
}

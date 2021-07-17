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

  const resDato = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      Authorization: process.env.DATOCMS_TOKEN,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ query: 'query { allCommunities { id title imageUrl creatorSlug} }' })
  })
  const { data: { allCommunities } } = await resDato.json()

  return {
    props: {
      githubUser,
      followers: followers.map(f => ({ id: f.login, image: `https://github.com/${f.login}.png` })),
      communities: allCommunities.map(f => ({ id: f.title, image: f.imageUrl, creatorSlug: f.creatorSlug })),
      stats: { confiavel: 3, legal: 2, sexy: 1 }
    }
  }
}

export default function Home ({ githubUser, stats, followers, communities }) {
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
Home.propTypes = {
  githubUser: PropTypes.string,
  stats: PropTypes.object,
  followers: PropTypes.array,
  communities: PropTypes.array
}

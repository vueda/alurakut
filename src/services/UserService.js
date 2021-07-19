export const getUserData = async (githubUser) => {
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
    githubUser,
    followers: followers.map(f => ({ id: f.login, image: `https://github.com/${f.login}.png` })),
    communities: allCommunities.map(f => ({ id: f.title, image: f.imageUrl, creatorSlug: f.creatorSlug })),
    stats: { confiavel: 3, legal: 2, sexy: 1 }
  }
}

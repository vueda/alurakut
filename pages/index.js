import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

export async function getServerSideProps() {
  const githubUser = 'vueda'
  const res = await fetch(`https://api.github.com/users/${githubUser}/followers`)
  const followers = await res.json()
  return {
    props: {
      githubUser,
      followers,
      stats: { 'confiavel': 3, 'legal': 2, 'sexy': 1 }
    }
  }
}

function ProfileSidebar({ githubUser }) {
  return (
    <Box>
      <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}

function WelcomeBox({ stats }) {
  return (
    <Box>
      <h1 className="title">
        Bem vindo(a)
      </h1>
      <OrkutNostalgicIconSet {...stats} />
    </Box>
  );
}

function RelationsSidebar({ followers }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        Pessoas da comunidade ({followers.length})
      </h2>

      <ul>
        {followers.map(person => {
          return (
            <li key={person.login}>
              <a href={`/users/${person.login}`}>
                <img src={`https://github.com/${person.login}.png`} />
                <span>{person.login}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home({ githubUser, stats, followers }) {
  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <WelcomeBox stats={stats} />
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <RelationsSidebar followers={followers} />
        </div>
      </MainGrid>
    </>
  )
}

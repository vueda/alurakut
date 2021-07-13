import { AlurakutMenu } from '../../lib/AlurakutCommons'
import { MainGrid } from './MainGrid'
import PropTypes from 'prop-types'

export function AlurakutLayout ({ user, left, center, right }) {
  return (
    <>
      <AlurakutMenu githubUser={user} />
      <MainGrid>
        <aside className="profileArea" style={{ gridArea: 'profileArea' }}>
          {left}
        </aside>
        <section className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          {center}
        </section>
        <aside className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          {right}
        </aside>
      </MainGrid>
    </>
  )
}
AlurakutLayout.propTypes = {
  user: PropTypes.string,
  left: PropTypes.node,
  center: PropTypes.node,
  right: PropTypes.node
}

import PropTypes from 'prop-types'
import { OrkutNostalgicIconSet } from '../lib/AlurakutCommons'
import { Box } from './layout/Box'

export function WelcomeBox ({ stats }) {
  return (
      <>
        <Box>
          <h1 className="title">
            Bem vindo(a)
          </h1>
          <OrkutNostalgicIconSet {...stats} />
        </Box>

      </>
  )
}
WelcomeBox.propTypes = {
  stats: PropTypes.object
}

import PropTypes from 'prop-types'
import { AlurakutProfileSidebarMenuDefault } from '../lib/AlurakutCommons'
import { Box } from './layout/Box'

const GITHUB_URL = 'https://github.com'

export function ProfileBox ({ user }) {
  return (<Box>
    <img src={`${GITHUB_URL}/${user}.png`} style={{ borderRadius: '8px' }} />
    <hr />
    <p>
      <a className="boxLink" href={`${GITHUB_URL}/${user}`}>{user}</a>
    </p>
    <hr />
    <AlurakutProfileSidebarMenuDefault />
  </Box>)
}
ProfileBox.propTypes = {
  user: PropTypes.string
}

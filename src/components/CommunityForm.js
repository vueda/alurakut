
import PropTypes from 'prop-types'
import { Box } from './layout/Box'

export function CommunityForm ({ communities, setCommunities }) {
  return (<Box>
        <h2 className="subTitle">Criar uma nova comunidade</h2>
        <form onSubmit={(e) => {
          e.preventDefault()
          const id = e.target.title.value
          const image = e.target.image.value
          setCommunities([...communities, { id, image }])
          e.target.reset()
        }}>
          <input name="title" type="text" placeholder="Qual vai ser o nome da sua comunidade?" aria-label="Qual vai ser o nome da sua comunidade?" />
          <input name="image" type="text" placeholder="Coloque uma URL para usarmos de capa" aria-label="Coloque uma URL para usarmos de capa" />
          <button>Criar comunidade</button>
        </form>
      </Box>)
}
CommunityForm.propTypes = {
  communities: PropTypes.array,
  setCommunities: PropTypes.func
}

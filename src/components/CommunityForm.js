
import PropTypes from 'prop-types'
import { Box } from './layout/Box'

export function CommunityForm ({ communities, setCommunities }) {
  return (<Box>
        <h2 className="subTitle">Criar uma nova comunidade</h2>
        <form onSubmit={async (e) => {
          e.preventDefault()
          const title = e.target.title.value
          const imageUrl = e.target.image.value
          const res = await fetch('/api/communities', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, imageUrl, creatorSlug: 'vueda' })
          })
          const data = await res.json()
          setCommunities([...communities, { id: data.title, image: data.imageUrl }])
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

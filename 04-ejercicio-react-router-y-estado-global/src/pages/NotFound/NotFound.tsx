import './NotFound.css'
import { Icon } from '@/components/Icon/Icon'
import { Link } from '@/components/Link/Link'

const NotFound = () => (
  <main className="cmp-not-found">
    <title>Página no encontrada | DevJobs</title>
    <h1>
      <Icon taIcon="linkOff" size="xl" />
      404
      <span>Página no encontrada</span>
    </h1>
    <p className="text-muted">
      Oops! Parece que has hecho un 'git push --force' a la URL equivocada.
    </p>
    <Link href="/" buttonLook>
      Volver al Inicio
    </Link>
  </main>
)

export default NotFound

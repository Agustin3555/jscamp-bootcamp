import './Header.css'
import { Button } from '@/components/Button/Button'
import { Link } from '../Link/Link'

export const Header = () => (
  <header className="cmp-header">
    <div className="content">
      <nav>
        <Link href="/">Inicio</Link>
        <Link href="/search">Empleos</Link>
        <Link href="#">Empresas</Link>
        <Link href="#">Salarios</Link>
      </nav>
      <Link href="/">
        <h1>
          <img src="/favicon.svg" alt="Logo de DevJobs" />
          DevJobs
        </h1>
      </Link>
      <div className="right">
        <nav>
          <Link href="#" buttonLook size="m" type="secondary">
            Publicar un empleo
          </Link>
          <Link href="#" buttonLook size="m">
            Iniciar sesión
          </Link>
        </nav>
        <Button
          title="Abrir menú"
          taIcon="menu"
          buttonHTMLAttrs={{
            'aria-label': 'Desplegar menú principal',
          }}
        />
      </div>
    </div>
  </header>
)

import './Header.css'
import { useCallback, type MouseEventHandler } from 'react'
import { Button } from '@/components/Button/Button'
import { Link } from '../Link/Link'
import { useAuthStore } from '@/store/auth.store'
import { Icon } from '../Icon/Icon'

export const Header = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)
  const login = useAuthStore(state => state.login)
  const logout = useAuthStore(state => state.logout)

  const handleLoginClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    e => {
      e.preventDefault()
      isLoggedIn ? logout() : login()
    },
    [isLoggedIn],
  )

  return (
    <header className="cmp-header">
      <div className="content">
        <nav>
          <Link href="/">Inicio</Link>
          <Link href="/search">Empleos</Link>
          <Link href="/company">Empresas</Link>
          <Link href="/wages">Salarios</Link>
        </nav>
        <Link href="/">
          <h1>
            <img src="/icons/favicon.svg" alt="Logo de DevJobs" />
            DevJobs
          </h1>
        </Link>
        <div className="right">
          <nav>
            <Link href="#" buttonLook size="m" type="secondary">
              Publicar un empleo
            </Link>
            <Link
              href="#"
              buttonLook
              size="m"
              anchorHTMLAttrs={{ onClick: handleLoginClick }}
            >
              {isLoggedIn ? (
                <>
                  <Icon taIcon="userCircle" size="s" />
                  Mi cuenta
                </>
              ) : (
                'Iniciar sesión'
              )}
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
}

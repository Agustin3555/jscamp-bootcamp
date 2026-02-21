import './Link.css'
import {
  useCallback,
  type AnchorHTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
} from 'react'
import { useRouter } from '@/hooks/useRouter'
import { NavLink } from 'react-router'
import { classList } from '@/helpers/classList.helper'

interface LinkProps {
  href: string
  buttonLook?: boolean
  type?: 'primary' | 'secondary' | 'tertiary'
  size?: 'l' | 'm' | 's'
  handleClass?: string
  anchorHTMLAttrs?: AnchorHTMLAttributes<HTMLAnchorElement>
  children?: ReactNode
}

export const Link = ({
  href,
  buttonLook = false,
  size = 'l',
  type = 'primary',
  handleClass,
  anchorHTMLAttrs,
  children,
}: LinkProps) => {
  const { navigateTo } = useRouter()

  const handleClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    e => {
      e.preventDefault()
      navigateTo(href)
    },
    [href, navigateTo],
  )

  return (
    <NavLink
      className={({ isActive }) =>
        classList(
          'cmp-link',
          `ui-${size}`,
          type,
          handleClass,
          { buttonLook },
          { isActive },
        )
      }
      to={href}
      onClick={handleClick}
      {...anchorHTMLAttrs}
    >
      {children}
    </NavLink>
  )
}

import './Link.css'
import {
  useCallback,
  type AnchorHTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
} from 'react'
import { useRouter } from '@/hooks/useRouter'
import { classList } from '@/helpers/classList.helper'

interface LinkProps {
  href: string
  buttonLook?: boolean
  type?: 'primary' | 'secondary' | 'tertiary'
  size?: 'l' | 'm' | 's'
  anchorHTMLAttrs?: AnchorHTMLAttributes<HTMLAnchorElement>
  children?: ReactNode
}

export const Link = ({
  href,
  buttonLook = false,
  size = 'l',
  type = 'primary',
  anchorHTMLAttrs,
  children,
}: LinkProps) => {
  const { currentPath, navigateTo } = useRouter()

  const handleClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    e => {
      e.preventDefault()
      navigateTo(href)
    },
    [href, navigateTo]
  )

  return (
    <a
      className={classList(
        'cmp-link',
        `ui-${size}`,
        type,
        { buttonLook },
        { isActive: href === currentPath }
      )}
      onClick={handleClick}
      {...{ href }}
      {...anchorHTMLAttrs}
    >
      {children}
    </a>
  )
}

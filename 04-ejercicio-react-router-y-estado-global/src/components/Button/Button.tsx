import './Button.css'
import type { ButtonHTMLAttributes } from 'react'
import { classList } from '@/helpers/classList.helper'
import { Icon, type TaIcon } from '../Icon/Icon'

interface ButtonProps {
  title?: string
  text?: string
  taIcon?: TaIcon
  type?: 'primary' | 'secondary' | 'tertiary'
  size?: 'l' | 'm' | 's'
  inverted?: boolean
  wrap?: boolean
  submit?: boolean
  handleClass?: string
  buttonHTMLAttrs?: ButtonHTMLAttributes<HTMLButtonElement>
}

export const Button = ({
  title,
  text,
  taIcon,
  size = 'l',
  type = 'primary',
  inverted = false,
  wrap = false,
  submit = false,
  handleClass,
  buttonHTMLAttrs,
}: ButtonProps) => (
  <button
    className={classList('cmp-button', `ui-${size}`, type, handleClass, {
      inverted,
      wrap,
      square: taIcon !== undefined && text === undefined,
    })}
    title={title ?? text}
    type={submit ? 'submit' : 'button'}
    {...buttonHTMLAttrs}
  >
    {text}
    {taIcon && <Icon {...{ taIcon }} />}
  </button>
)

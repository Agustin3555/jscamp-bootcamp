import './Loader.css'
import { classList } from '@/helpers/classList.helper'

interface LoaderProps {
  size?: 's' | 'm' | 'l'
}

export const Loader = ({ size = 's' }: LoaderProps) => (
  <span className={classList('cmp-loader', size)} />
)

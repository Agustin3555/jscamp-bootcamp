import './JobFavoriteButton.css'
import { useCallback, type MouseEventHandler } from 'react'
import { useFavoriteStore } from '@/store/favorite.store'
import { Button } from '../Button/Button'
import { classList } from '@/helpers/classList.helper'
import { useAuthStore } from '@/store/auth.store'

interface JobFavoriteButtonProps {
  jobId: string
}

export const JobFavoriteButton = ({ jobId }: JobFavoriteButtonProps) => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)
  const isFavorite = useFavoriteStore(state => state.isFavorite(jobId))
  const toggleFavorite = useFavoriteStore(state => state.toggleFavorite)

  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(e => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(jobId)
  }, [])

  if (!isLoggedIn) return null

  return (
    <Button
      handleClass={classList('cmp-job-favorite-button', {
        isActive: isFavorite,
      })}
      taIcon={isFavorite ? 'heart' : 'heartPlus'}
      title={isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
      buttonHTMLAttrs={{ onClick: handleClick }}
    />
  )
}

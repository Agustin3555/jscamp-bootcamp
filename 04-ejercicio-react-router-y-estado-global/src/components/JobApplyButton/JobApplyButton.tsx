import './JobApplyButton.css'
import { useCallback, type MouseEventHandler } from 'react'
import { useApplyStore } from '@/store/apply.store'
import { Button } from '../Button/Button'
import { useAuthStore } from '@/store/auth.store'

interface JobApplyButtonProps {
  jobId: string
}

export const JobApplyButton = ({ jobId }: JobApplyButtonProps) => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)
  const isApplied = useApplyStore(state => state.isApplied(jobId))
  const addApplied = useApplyStore(state => state.addApplied)

  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(e => {
    e.preventDefault()
    e.stopPropagation()
    addApplied(jobId)
  }, [])

  if (!isLoggedIn) return null

  return (
    <Button
      handleClass="cmp-job-apply-button"
      text={isApplied ? '¡Aplicado!' : 'Aplicar'}
      buttonHTMLAttrs={{ disabled: isApplied, onClick: handleClick }}
    />
  )
}

import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router'

export const useRouter = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navigateTo = useCallback((path: string) => navigate(path), [navigate])

  return { currentPath: location.pathname, navigateTo }
}

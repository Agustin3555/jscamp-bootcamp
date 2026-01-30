import type { ReactNode } from 'react'
import { useRouter } from '@/hooks/useRouter'

interface RouteProps {
  path: string
  component: ReactNode
}

export const Route = ({ path, component }: RouteProps) => {
  const { currentPath } = useRouter()
  return currentPath === path ? component : null
}

import './Results.css'
import {
  useCallback,
  useEffect,
  useMemo,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { useAsyncAction } from '@/hooks/useAsyncAction.hook'
import { Icon } from '@/components/Icon/Icon'
import { Loader } from '@/components/Loader/Loader'
import { JobCard } from './components/JobCard/JobCard'
import { Pagination } from './components/Pagination/Pagination'
import { Jobs } from '@/services/jobs.service'
import { useRouter } from '@/hooks/useRouter'

const RESULTS_PER_PAGE = 5

interface ResultProps {
  text?: string
  technology?: string
  type?: string
  level?: string
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export const Result = ({
  text,
  technology,
  type,
  level,
  currentPage,
  setCurrentPage,
}: ResultProps) => {
  const { navigateTo } = useRouter()

  const search = useCallback(async () => {
    const limit = RESULTS_PER_PAGE
    const offset = (currentPage - 1) * RESULTS_PER_PAGE

    return await Jobs.getAll({ text, technology, type, level, limit, offset })
  }, [text, technology, type, level, currentPage])

  const { status, data: response, fetch } = useAsyncAction(search)

  useEffect(() => {
    fetch()
  }, [fetch])

  const totalPages = useMemo(
    () => (response ? Math.ceil(response.total / RESULTS_PER_PAGE) : 0),
    [response]
  )

  useEffect(() => {
    const params = new URLSearchParams()

    if (text) params.append('text', text)
    if (technology) params.append('technology', technology)
    if (type) params.append('type', type)
    if (level) params.append('level', level)
    params.append('page', String(currentPage))

    const { pathname } = window.location

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname

    navigateTo(newUrl)
  }, [text, technology, type, level, currentPage, navigateTo])

  const title = `${
    response
      ? `Resultados ${response.total} | Página ${currentPage}`
      : 'Cargando...'
  } | DevJobs`

  return (
    <section className="cmp-results">
      <title>{title}</title>
      <h2>Resultados de búsqueda</h2>
      {status === 'loading' ? (
        <Loader size="l" />
      ) : response ? (
        <>
          <ul className="jobs-listings">
            {response.data.map(({ id, ...rest }) => (
              <li key={id}>
                <JobCard {...rest} />
              </li>
            ))}
          </ul>
          <Pagination {...{ totalPages, currentPage, setCurrentPage }} />
        </>
      ) : (
        <small>
          No se han encontrado empleos que coincidan con los criterios de
          búsqueda.
          <Icon taIcon="moodSadSquint" size="l" />
        </small>
      )}
    </section>
  )
}

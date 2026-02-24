import './Results.css'
import {
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import { useAsyncAction } from '@/hooks/useAsyncAction.hook'
import { Icon } from '@/components/Icon/Icon'
import { Loader } from '@/components/Loader/Loader'
import { JobCard } from './components/JobCard/JobCard'
import { Pagination } from './components/Pagination/Pagination'
import { Jobs } from '@/services/jobs.service'
import type { FilterJobsParams } from '../../types'

const RESULTS_PER_PAGE = 10

interface ResultProps extends FilterJobsParams {
  onPageChange: (page: FilterJobsParams['page']) => void
}

export const Result = ({
  text,
  technology,
  type,
  level,
  page: currentPage = 1,
  onPageChange,
}: ResultProps) => {
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
    [response],
  )

  const title = `${response
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
            {response.data.map(job => (
              <li key={job.id}>
                <JobCard {...job} />
              </li>
            ))}
          </ul>
          <Pagination {...{ totalPages, currentPage, onPageChange }} />
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

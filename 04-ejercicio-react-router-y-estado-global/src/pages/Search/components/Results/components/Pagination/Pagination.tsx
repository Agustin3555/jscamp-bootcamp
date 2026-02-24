import './Pagination.css'
import {
  useCallback,
  type MouseEventHandler,
} from 'react'
import { Icon } from '@/components/Icon/Icon'
import { classList } from '@/helpers/classList.helper'
import type { FilterJobsParams } from '@/pages/Search/types'

interface PaginationProps {
  totalPages: number
  currentPage?: number
  onPageChange: (page: FilterJobsParams['page']) => void
}

export const Pagination = ({
  totalPages,
  currentPage = 1,
  onPageChange,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === pages.length

  const buildPageUrl = useCallback((page: number) => {
    const url = new URL(String(window.location))
    url.searchParams.set('page', String(page))
    return `${url.pathname}?${url.searchParams.toString()}`
  }, [])

  const handleClickPrev: MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault()
    if (isFirstPage === false) onPageChange(currentPage - 1)
  }

  const handleClickNext: MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault()
    if (isLastPage === false) onPageChange(currentPage + 1)
  }

  const handleChangePage: (
    page: FilterJobsParams['page']
  ) => MouseEventHandler<HTMLAnchorElement> = page => e => {
    e.preventDefault()
    if (page !== currentPage) onPageChange(page)
  }

  return (
    <nav className="cmp-pagination" aria-label="Paginación de resultados">
      <a
        className={classList('ui-l', { isDisabled: isFirstPage })}
        title="Página anterior"
        href={buildPageUrl(currentPage - 1)}
        aria-label="Ir a la página anterior de los resultados de búsqueda"
        aria-disabled={isFirstPage}
        onClick={handleClickPrev}
      >
        <Icon taIcon="chevronLeft" />
      </a>
      {pages.map(page => {
        const isActive = page === currentPage

        return (
          <a
            key={page}
            className={classList('ui-l', { isActive })}
            href={buildPageUrl(page)}
            aria-current={isActive ? 'page' : undefined}
            onClick={handleChangePage(page)}
          >
            {page}
          </a>
        )
      })}
      <a
        className={classList('ui-l', { isDisabled: isLastPage })}
        title="Página siguiente"
        href={buildPageUrl(currentPage + 1)}
        aria-label="Ir a la página siguiente de los resultados de búsqueda"
        aria-disabled={isLastPage}
        onClick={handleClickNext}
      >
        <Icon taIcon="chevronLeft" />
      </a>
    </nav>
  )
}

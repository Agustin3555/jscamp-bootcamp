import './Search.css'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { SearchForm } from './components/SearchForm/SearchForm'
import { Result } from './components/Results/Results'
import type { FilterJobsParams } from './types'

/* Podemos agregar un type a nivel de `Search` para definir el contrato de tipos de los filtros */
const getInitialParams = (searchParams: URLSearchParams): FilterJobsParams => ({
  text: searchParams.get('text') ?? undefined,
  technology: searchParams.get('technology') ?? undefined,
  type: searchParams.get('type') ?? undefined,
  level: searchParams.get('level') ?? undefined,
  page: (() => {
    const page = Number(searchParams.get('page'))
    return Number.isNaN(page) || page < 1 ? 1 : page
  })(),
})

const Search = () => {
  const [searchParams] = useSearchParams()

  const initialParams = useMemo(() => getInitialParams(searchParams), [])

  const [text, setText] = useState(initialParams.text)
  const [technology, setTechnology] = useState(initialParams.technology)
  const [type, setType] = useState(initialParams.type)
  const [level, setLevel] = useState(initialParams.level)
  const [currentPage, setCurrentPage] = useState(initialParams.page)

  const onFilterChange = (name: keyof FilterJobsParams, value: FilterJobsParams[keyof FilterJobsParams]) => {
    if (name === 'text') setText(value as FilterJobsParams['text'])
    if (name === 'technology') setTechnology(value as FilterJobsParams['technology'])
    if (name === 'type') setType(value as FilterJobsParams['type'])
    if (name === 'level') setLevel(value as FilterJobsParams['level'])
    if (name === 'page') setCurrentPage(value as FilterJobsParams['page'])
  }

  const onPageChange = (page: FilterJobsParams['page']) => {
    // Si es la misma página, ignoramos
    if (page === currentPage) return
    if (page === undefined) return

    if (page < 1) return onFilterChange('page', 1)

    onFilterChange('page', page)
  }

  /* Con esto evitamos que se repita tanto el objeto en los componentes que lo usan */
  const filtersValues = {
    text,
    technology,
    type,
    level,
    page: currentPage,
  }

  return (
    <main className="cmp-search">
      <section className="jobs-search">
        <h1>Encuentra tu próximo trabajo</h1>
        <p className="text-muted">
          Explora miles de oportunidades en el sector tecnológico
        </p>
        {/* 
        Siempre que podamos, evitemos enviar los setters como props. En su lugar es mejor usar una función que se encargue de una responsabilidad en concreto.
        Si no queremos crear funciones para todos los setters, podemos simplificarlo en un onFilterChange
        Dejo un ejemplo de cómo quedaría
        */}
        <SearchForm
          {...filtersValues}
          /* Sacando los setters, queda una función más declarativa y que deja en claro su responsabilidad */
          onFilterChange={onFilterChange}
        />
      </section>
      <Result
        {...filtersValues}
        /* Lo mismo aquí, queda más clara la responsabilidad de la acción */
        onPageChange={onPageChange}
      />
    </main>
  )
}

export default Search

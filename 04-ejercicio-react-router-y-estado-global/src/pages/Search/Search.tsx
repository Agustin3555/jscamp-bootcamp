import './Search.css'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { SearchForm } from './components/SearchForm/SearchForm'
import { Result } from './components/Results/Results'

const getInitialParams = (searchParams: URLSearchParams) => ({
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
  const [searchParams, setSearchParams] = useSearchParams()

  const initialParams = useMemo(() => getInitialParams(searchParams), [])

  const [text, setText] = useState(initialParams.text)
  const [technology, setTechnology] = useState(initialParams.technology)
  const [type, setType] = useState(initialParams.type)
  const [level, setLevel] = useState(initialParams.level)
  const [currentPage, setCurrentPage] = useState(initialParams.page)

  return (
    <main className="cmp-search">
      <section className="jobs-search">
        <h1>Encuentra tu próximo trabajo</h1>
        <p className="text-muted">
          Explora miles de oportunidades en el sector tecnológico
        </p>
        <SearchForm
          {...{
            text,
            setText,
            technology,
            setTechnology,
            type,
            setType,
            level,
            setLevel,
            setCurrentPage,
            currentPage,
            setSearchParams,
          }}
        />
      </section>
      <Result
        {...{ text, technology, type, level, currentPage, setCurrentPage }}
      />
    </main>
  )
}

export default Search

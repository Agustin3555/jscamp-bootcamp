import './Search.css'
import { useState } from 'react'
import { SearchForm } from './components/SearchForm/SearchForm'
import { Result } from './components/Results/Results'

const initFilter = (name: string) => () => {
  const params = new URLSearchParams(window.location.search)
  return params.get(name) ?? undefined
}

const Search = () => {
  const [text, setText] = useState(initFilter('text'))
  const [technology, setTechnology] = useState(initFilter('technology'))
  const [type, setType] = useState(initFilter('type'))
  const [level, setLevel] = useState(initFilter('level'))

  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const page = Number(params.get('page'))

    if (Number.isNaN(page) || page < 1) return 1
    return page
  })

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

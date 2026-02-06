import './Search.css'
import { useState } from 'react'
import { SearchForm } from './components/SearchForm/SearchForm'
import { Result } from './components/Results/Results'

const getInitialParams = () => {
  const params = new URLSearchParams(window.location.search)

  return {
    text: params.get('text') ?? undefined,
    technology: params.get('technology') ?? undefined,
    type: params.get('type') ?? undefined,
    level: params.get('level') ?? undefined,
    page: (() => {
      const page = Number(params.get('page'))
      return Number.isNaN(page) || page < 1 ? 1 : page
    })(),
  }
}

const Search = () => {
  /* 
   * Optimización de performance:
   * En lugar de llamar getInitialParams() dentro de cada useState (lo que crearía
   * URLSearchParams 5 veces), lo llamamos una sola vez y reutilizamos el resultado.
   * 
   * Nota: getInitialParams() se ejecuta en cada render, pero React solo usa el valor
   * inicial en el primer render para useState. Los valores en re-renders son ignorados.
   */
  const initialParams = getInitialParams()

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

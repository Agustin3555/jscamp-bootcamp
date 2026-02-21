import './SearchForm.css'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEventHandler,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { Icon } from '@/components/Icon/Icon'
import { Button } from '@/components/Button/Button'
import { Select, type SelectProps } from '@/components/Select/Select'
import type { SetURLSearchParams } from 'react-router'

interface SearchFormProps {
  text: string | undefined
  setText: Dispatch<SetStateAction<string | undefined>>
  technology: string | undefined
  setTechnology: Dispatch<SetStateAction<string | undefined>>
  type: string | undefined
  setType: Dispatch<SetStateAction<string | undefined>>
  level: string | undefined
  setLevel: Dispatch<SetStateAction<string | undefined>>

  setCurrentPage: Dispatch<SetStateAction<number>>
  currentPage: number
  setSearchParams: SetURLSearchParams
}

export const SearchForm = ({
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
}: SearchFormProps) => {
  const [textValue, setTextValue] = useState(text)
  const timeoutId = useRef<number>(null)

  const handleReset = useCallback(() => {
    setTextValue('')

    setText('')
    setTechnology('')
    setType('')
    setLevel('')
  }, [setText, setTechnology, setType, setLevel])

  const handleChangeText = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => {
      const text = e.target.value
      setTextValue(text)

      if (timeoutId.current) clearTimeout(timeoutId.current)

      timeoutId.current = setTimeout(() => {
        setText(text)
        setCurrentPage(1)
      }, 500)
    },
    [setText, setCurrentPage],
  )

  const handleChangeSelect = useCallback<
    (
      setter: Dispatch<SetStateAction<string | undefined>>,
    ) => ChangeEventHandler<HTMLSelectElement>
  >(
    setter => e => {
      setter(e.target.value)
      setCurrentPage(1)
    },
    [setCurrentPage],
  )

  useEffect(() => {
    setSearchParams(() => {
      const params = new URLSearchParams()

      if (text) params.set('text', text)
      if (technology) params.set('technology', technology)
      if (type) params.set('type', type)
      if (level) params.set('level', level)
      params.set('page', String(currentPage))

      return params
    })
  }, [text, technology, type, level, currentPage])

  const selects = [
    {
      name: 'technology-filter',
      title: 'Tecnología',
      value: technology,
      options: [
        [
          { value: 'javascript', title: 'JavaScript' },
          { value: 'react', title: 'React' },
          { value: 'nodejs', title: 'Node.js' },
        ],
        [
          { value: 'c', title: 'C' },
          { value: 'c++', title: 'C++' },
          { value: 'csharp', title: 'C#' },
        ],
        [
          { value: 'php', title: 'PHP' },
          { value: 'java', title: 'Java' },
          { value: 'ruby', title: 'Ruby' },
          { value: 'python', title: 'Python' },
        ],
      ],
      onChange: handleChangeSelect(setTechnology),
    },
    {
      name: 'type-filter',
      title: 'Ubicación',
      value: type,
      options: [
        [{ value: 'remoto', title: 'Remoto' }],
        [
          { value: 'cdmx', title: 'Ciudad de México' },
          { value: 'guadalajara', title: 'Guadalajara' },
          { value: 'monterrey', title: 'Monterrey' },
          { value: 'barcelona', title: 'Barcelona' },
        ],
      ],
      onChange: handleChangeSelect(setType),
    },
    {
      name: 'level-filter',
      title: 'Nivel de experiencia',
      value: level,
      options: [
        [
          { value: 'junior', title: 'Junior' },
          { value: 'mid', title: 'Mid-level' },
          { value: 'senior', title: 'Senior' },
          { value: 'lead', title: 'Lead' },
        ],
      ],
      onChange: handleChangeSelect(setLevel),
    },
  ] satisfies SelectProps[]

  return (
    <form
      className="cmp-search-form search-form-main"
      role="search"
      onSubmit={e => e.preventDefault()}
      onReset={handleReset}
    >
      <div className="main">
        <Icon taIcon="search" />
        <label>
          <input
            name="search"
            value={textValue}
            type="search"
            placeholder="Buscar empleos por título, habilidad o empresa"
            aria-label="Buscar"
            onChange={handleChangeText}
          />
        </label>
        <Button
          title="Reiniciar valores"
          taIcon="x"
          buttonHTMLAttrs={{
            type: 'reset',
            'aria-label': 'Reiniciar todos los valores de búsqueda',
          }}
        />
      </div>
      <div className="filters">
        {selects.map(item => (
          <Select key={item.name} {...item} />
        ))}
      </div>
    </form>
  )
}

import './SearchForm.css'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEventHandler,
} from 'react'
import { Icon } from '@/components/Icon/Icon'
import { Button } from '@/components/Button/Button'
import { Select, type SelectProps } from '@/components/Select/Select'
import type { FilterJobsParams } from '../../types'
import { useSearchParams } from 'react-router'

/* Podemos aprovechar que tenemos el contrato de tipos de los filtros para extenderlo y agregar los setters. De esta manera queda más simple y mantenible */
interface SearchFormProps extends FilterJobsParams {
  onFilterChange: (name: keyof FilterJobsParams, value: FilterJobsParams[keyof FilterJobsParams]) => void
}

/* Hicimos cambios para generar un handler que se encargue de modificar los valores de los filtros. La lógica del handler está en el componente padre, y este componente es quien lo usa, sin saber qué hace internamente la función */
/* Con este cambio, el componente SearchForm se vuelve más simple y mantenible */
export const SearchForm = ({
  text,
  technology,
  type,
  level,
  page: currentPage,
  onFilterChange,
}: SearchFormProps) => {
  /* podemos usar otra vez el hook de useSearchParams aquí y evitar pasar el setter como prop. Con esto nos ahorramos un setter adicional y evitamos el tener que importar el type de la librería de react-router */
  const [, setSearchParams] = useSearchParams()
  const [textValue, setTextValue] = useState(text)
  const timeoutId = useRef<number>(null)

  const handleReset = useCallback(() => {
    setTextValue('')

    onFilterChange('text', undefined)
    onFilterChange('technology', undefined)
    onFilterChange('type', undefined)
    onFilterChange('level', undefined)
    onFilterChange('page', 1)
  }, [onFilterChange])

  const handleChangeText = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => {
      const text = e.target.value
      setTextValue(text)

      if (timeoutId.current) clearTimeout(timeoutId.current)

      timeoutId.current = setTimeout(() => {
        onFilterChange('text', text)
        onFilterChange('page', 1)
      }, 500)
    },
    [onFilterChange],
  )

  const handleChangeSelect = useCallback<
    (
      name: keyof FilterJobsParams
    ) => ChangeEventHandler<HTMLSelectElement>
  >(
    name => e => {
      onFilterChange(name, e.target.value)
      onFilterChange('page', 1)
    },
    [onFilterChange],
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
  }, [text, technology, type, level, currentPage, setSearchParams])

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
      onChange: handleChangeSelect('technology'),
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
      onChange: handleChangeSelect('type'),
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
      onChange: handleChangeSelect('level'),
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

import './SearchForm.css'
import {
  useCallback,
  useRef,
  useState,
  type ChangeEventHandler,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { Icon } from '@/components/Icon/Icon'
import { Button } from '@/components/Button/Button'
import { Select, type SelectProps } from '@/components/Select/Select'

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
}

/* 
Siempre que podamos es buena práctica evitar pasar `setStates` como props
En su lugar, es mejor pasar un callback que maneje la lógica de los estados
Por ejemplo: handleReset, para hacer lo que necesitemos cuando se llame
*/
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
    [setText, setCurrentPage]
  )

  const handleChangeSelect = useCallback<
    (
      setter: Dispatch<SetStateAction<string | undefined>>
    ) => ChangeEventHandler<HTMLSelectElement>
  >(
    setter => e => {
      setter(e.target.value)
      setCurrentPage(1)
    },
    [setCurrentPage]
  )

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
      /* Podemos hacerlo en linea. La función `handleSubmit` no hace nada, por lo que podemos evitar ruido en el código */
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

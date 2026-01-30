import './Select.css'
import type { ChangeEventHandler } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { Icon } from '../Icon/Icon'

export interface SelectProps {
  id?: string
  name?: string
  title: string
  value?: string
  options: { value: string; title: string }[][]
  onChange?: ChangeEventHandler<HTMLSelectElement>
}

export const Select = ({
  id,
  name,
  title,
  value,
  options: groups,
  onChange,
}: SelectProps) => (
  <label htmlFor={id}>
    <select
      className="cmp-select"
      aria-label={title}
      {...{ id, name, value, onChange }}
    >
      <button>
        <selectedcontent></selectedcontent>
        <Icon taIcon="chevronLeft" size="s" />
      </button>
      <option value="">{title}</option>
      {groups.map((options, i) => (
        <Fragment key={i}>
          {options.map(({ value, title }) => (
            <option key={value} {...{ value }}>
              {title}
            </option>
          ))}
          {i !== groups.length - 1 && <hr />}
        </Fragment>
      ))}
    </select>
  </label>
)

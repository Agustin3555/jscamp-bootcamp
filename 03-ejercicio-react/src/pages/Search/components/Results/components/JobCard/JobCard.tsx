import './JobCard.css'
import { useCallback, useState, type MouseEventHandler } from 'react'
import { Button } from '@/components/Button/Button'
import type { Job } from '@/services/jobs.service'

type JobCardProps = Pick<
  Job,
  'titulo' | 'empresa' | 'ubicacion' | 'descripcion'
>

export const JobCard = ({
  titulo,
  empresa,
  ubicacion,
  descripcion,
}: JobCardProps) => {
  const [applied, setApplied] = useState(false)

  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(e => {
    e.preventDefault()
    setApplied(true)
  }, [])

  return (
    <a className="cmp-job-card" href="#">
      <article>
        <header>
          <div>
            <h3>{titulo}</h3>
            <small className="text-muted">
              {empresa} | {ubicacion}
            </small>
          </div>
          <Button
            text={applied ? '¡Aplicado!' : 'Aplicar'}
            buttonHTMLAttrs={{ disabled: applied, onClick: handleClick }}
          />
        </header>
        <p>{descripcion}</p>
      </article>
    </a>
  )
}

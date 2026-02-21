import './JobCard.css'
import type { Job } from '@/services/jobs.service'
import { Link } from '@/components/Link/Link'
import { JobApplyButton } from '@/components/JobApplyButton/JobApplyButton'
import { JobFavoriteButton } from '@/components/JobFavoriteButton/JobFavoriteButton'

type JobCardProps = Pick<
  Job,
  'id' | 'titulo' | 'empresa' | 'ubicacion' | 'descripcion'
>

export const JobCard = ({
  id,
  titulo,
  empresa,
  ubicacion,
  descripcion,
}: JobCardProps) => (
  <Link handleClass="cmp-job-card" href={`/jobs/${id}`}>
    <article>
      <header>
        <div>
          <h3>{titulo}</h3>
          <small className="text-muted">
            {empresa} | {ubicacion}
          </small>
        </div>
        <div className="actions">
          <JobApplyButton jobId={id} />
          <JobFavoriteButton jobId={id} />
        </div>
      </header>
      <p>{descripcion}</p>
    </article>
  </Link>
)

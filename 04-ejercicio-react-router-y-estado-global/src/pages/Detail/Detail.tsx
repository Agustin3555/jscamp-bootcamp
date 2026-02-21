import './Detail.css'
import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router'
import { useAsyncAction } from '@/hooks/useAsyncAction.hook'
import { Link } from '@/components/Link/Link'
import { JobApplyButton } from '@/components/JobApplyButton/JobApplyButton'
import { JobFavoriteButton } from '@/components/JobFavoriteButton/JobFavoriteButton'
import { Section } from './components/Section/Section'
import { Jobs } from '@/services/jobs.service'

const Detail = () => {
  const { jobId: jobIdParam } = useParams()
  const jobId = jobIdParam!

  const getJob = useCallback(async () => await Jobs.getOne(jobId), [jobId])

  const { data: job, fetch } = useAsyncAction(getJob)

  useEffect(() => {
    fetch()
  }, [fetch])

  if (!job) return

  const {
    titulo,
    empresa,
    ubicacion,
    content: { description, responsibilities, requirements, about },
  } = job

  const title = `${titulo} | DevJobs`

  return (
    <main className="cmp-detail">
      <title>{title}</title>
      <nav>
        <Link handleClass="text-muted" href="/search">
          Empleos
        </Link>
        <span className="text-muted">/</span>
        <span>{titulo}</span>
      </nav>
      <section>
        <header>
          <div>
            <h2>{titulo}</h2>
            <p className="text-muted">
              {empresa} | {ubicacion}
            </p>
          </div>
          <div className="actions">
            <JobApplyButton {...{ jobId }} />
            <JobFavoriteButton {...{ jobId }} />
          </div>
        </header>
        <div className="desc">
          <Section title="Descripción del puesto" content={description} />
          <Section title="Responsabilidades" content={responsibilities} />
          <Section title="Requisitos" content={requirements} />
          <Section title="Acerca de la empresa" content={about} />
        </div>
      </section>
      <div className="actions">
        <JobApplyButton {...{ jobId }} />
        <JobFavoriteButton {...{ jobId }} />
      </div>
    </main>
  )
}

export default Detail

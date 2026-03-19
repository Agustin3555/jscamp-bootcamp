import jobsInit from '../jobs.json' with { type: 'json' }

export type Job = (typeof jobs)[number]

let jobs = jobsInit

export class JobModel {
  static getAll = ({
    text,
    title,
    technology,
    limit = 10,
    offset = 0,
  }: {
    text?: string
    title?: Job['titulo']
    technology?: Job['data']['technology'][number]
    limit?: number
    offset?: number
  }) => {
    let filteredJobs = jobs

    if (text) {
      const searchTerm = text.toLowerCase()
      filteredJobs = filteredJobs.filter(
        j =>
          j.titulo.toLowerCase().includes(searchTerm) ||
          j.descripcion.toLowerCase().includes(searchTerm),
      )
    }

    if (title) {
      filteredJobs = filteredJobs.filter(j =>
        j.titulo.toLowerCase().includes(title.toLowerCase()),
      )
    }

    if (technology) {
      filteredJobs = filteredJobs.filter(j =>
        j.data.technology.includes(technology),
      )
    }

    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)

    const paginatedJobs = filteredJobs.slice(
      offsetNumber,
      offsetNumber + limitNumber,
    )

    return paginatedJobs
  }

  static getById = (id: Job['id']) => jobs.find(j => j.id === id)

  static create = ({
    titulo,
    empresa,
    ubicacion,
    descripcion,
    data,
    content,
  }: Omit<Job, 'id'>) => {
    const newJob = {
      id: crypto.randomUUID(),
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data,
      content,
    }

    jobs.push(newJob)

    return newJob
  }

  static updateById = (id: Job['id'], newJob: Job) => {
    this.deleteById(id)
    jobs.push(newJob)
  }

  static deleteById = (id: Job['id']) => {
    jobs = jobs.filter(j => j.id !== id)
  }
}

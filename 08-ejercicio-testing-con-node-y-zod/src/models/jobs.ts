import jobsInit from './jobs.json' with { type: 'json' }

export type Job = (typeof jobs)[number]

let jobs = jobsInit

export class JobModel {
  static getAll = async ({
    text,
    title,
    technology,
    limit = 10,
    offset = 0,
  }: {
    text?: string
    title?: string
    technology?: string
    limit?: number
    offset?: number
  }) => {
    let filteredJobs = [...jobs]

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

  static getById = async (id: string) => jobs.find(j => j.id === id)

  static create = async ({
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

  static updateById = async (id: string, newJobContent: Partial<Job>) => {
    const index = jobs.findIndex(j => j.id === id)
    if (index === -1) return null

    const updatedJob = { ...jobs[index], ...newJobContent } as Job
    jobs[index] = updatedJob
    return updatedJob
  }

  static deleteById = async (id: string) => {
    const index = jobs.findIndex(j => j.id === id)
    if (index === -1) return false

    jobs.splice(index, 1)
    return true
  }
}

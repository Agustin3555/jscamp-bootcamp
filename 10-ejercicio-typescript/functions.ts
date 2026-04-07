/* Aquí deberás usar los tipos creados en los ejercicios anteriores para definir los tipos de los parámetros y el valor de retorno de las funciones */

import type { JobSearchService } from './interfaces'
import type { Technology } from './types'

export const filterByExperience: JobSearchService['filterByExperience'] = (
  jobs,
  level,
) => {
  return jobs.filter(j => j.experienceLevel === level)
}

export const filterByTechnology: JobSearchService['filterByTechnology'] = (
  jobs,
  tech,
) => {
  return jobs.filter(j =>
    j.technologies.includes(tech.toLowerCase() as Technology),
  )
}

export const filterByMinSalary: JobSearchService['filterByMinSalary'] = (
  jobs,
  minSalary,
) => {
  return jobs.filter(j => j.salary !== undefined && j.salary >= minSalary)
}

export const searchJobs: JobSearchService['searchJobs'] = (
  jobs,
  searchTerm,
) => {
  const term = searchTerm.toLowerCase()

  return jobs.filter(
    j =>
      j.title.toLowerCase().includes(term) ||
      j.description.toLowerCase().includes(term),
  )
}

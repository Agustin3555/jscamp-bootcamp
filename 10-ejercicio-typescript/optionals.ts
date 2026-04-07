/* Aquí deberás tipar los parámetros y el valor de retorno de las funciones, teniendo en cuenta que existen parámetros opcionales y valores por defecto */

import {
  searchJobs,
  filterByExperience,
  filterByTechnology,
  filterByMinSalary,
} from './functions.ts'
import type { Job } from './objects.ts'
import type { ExperienceLevel, Technology } from './types.ts'

// Función de búsqueda avanzada con opcionales
export function advancedSearch(
  jobs: Job[],
  {
    text,
    level,
    technology,
    minSalary,
    workMode,
  }: {
    text?: string
    level?: ExperienceLevel
    technology?: Technology
    minSalary?: number
    workMode?: string
  },
): Job[] {
  let results = jobs

  if (text) results = searchJobs(results, text)
  if (level) results = filterByExperience(results, level)
  if (technology) results = filterByTechnology(results, technology)
  if (minSalary) results = filterByMinSalary(results, minSalary)
  if (workMode) results = results.filter(j => j.workMode === workMode)

  return results
}

// Función con valores por defecto
export function getRecentJobs(jobs: Job[], days = 30): Job[] {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  return jobs.filter(job => job.postedDate >= cutoffDate)
}

import { buildPath } from '@/helpers/buidPatch.helper'
import { queryParams } from '@/helpers/queryParams.helper'

export interface Job {
  id: string
  titulo: string
  empresa: string
  ubicacion: string
  descripcion: string
  data: {
    technology: string[]
    modalidad: string
    nivel: string
  }
  content: {
    description: string
    responsibilities: string
    requirements: string
    about: string
  }
}

const collection = buildPath('jobs')

export class Jobs {
  static getAll = async (data: {
    text?: string
    technology?: string
    type?: string
    level?: string
    limit: number
    offset: number
  }) => {
    interface GetAllResponse {
      total: number
      limit: number
      offset: number
      results: number
      data: Job[]
    }

    const rawResponse = await fetch(collection(queryParams(data)))
    const response: GetAllResponse = await rawResponse.json()
    return response.total ? response : undefined
  }

  static getOne = async (id: string) => {
    const rawResponse = await fetch(collection(id))
    const response: Job = await rawResponse.json()

    return response
  }
}

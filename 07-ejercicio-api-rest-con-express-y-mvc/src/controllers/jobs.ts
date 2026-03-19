import type { RequestHandler } from 'express'
import { JobModel, type Job } from '../models/jobs.js'
import { DEFAULTS } from '../config.js'

export class JobController {
  static getAll: RequestHandler = (req, res) => {
    const {
      text,
      title,
      technology,
      limit = DEFAULTS.LIMIT_PAGINATION,
      offset = DEFAULTS.LIMIT_OFFSET,
    } = req.query

    const jobs = JobModel.getAll({
      text,
      title,
      technology,
      limit,
      offset,
    } as any)

    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)

    return res.json({
      data: jobs,
      total: jobs.length,
      limit: limitNumber,
      offset: offsetNumber,
    })
  }

  static getId: RequestHandler = (req, res) => {
    const { job } = req
    return res.json(job)
  }

  static create: RequestHandler = (req, res) => {
    const newJob = JobModel.create(req.body as Job)
    return res.status(201).json(newJob)
  }

  static partialUpdate: RequestHandler = (req, res) => {
    const { params, body, job } = req
    const { id } = params

    const newJob = { ...job, ...body }
    JobModel.updateById(id as string, newJob)

    return res.status(204).end()
  }

  static update: RequestHandler = (req, res) => {
    const { params, body } = req
    const { id } = params

    JobModel.updateById(id as string, body)

    return res.status(204).end()
  }

  static delete: RequestHandler = (req, res) => {
    const { params, job } = req
    const { id } = params

    JobModel.deleteById(id as string)

    return res.json(job)
  }
}

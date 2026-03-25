import type { RequestHandler } from 'express'
import { JobModel } from '../models/jobs.js'
import { DEFAULTS } from '../config.js'

export class JobController {
  static getAll: RequestHandler = async (req, res) => {
    const {
      text,
      title,
      technology,
      limit = DEFAULTS.LIMIT_PAGINATION,
      offset = DEFAULTS.LIMIT_OFFSET,
    } = req.query

    const jobs = await JobModel.getAll({
      text: text as string,
      title: title as string,
      technology: technology as string,
      limit: Number(limit),
      offset: Number(offset),
    })

    return res.json({
      data: jobs,
      total: jobs.length,
      limit: Number(limit),
      offset: Number(offset),
    })
  }

  static getId: RequestHandler = (req, res) => {
    const { job } = req
    return res.json(job)
  }

  static create: RequestHandler = async (req, res) => {
    const newJob = await JobModel.create(req.body)
    return res.status(201).json(newJob)
  }

  static update: RequestHandler = async (req, res) => {
    const { params, body } = req
    const id = params['id'] as string

    const updatedJob = await JobModel.updateById(id, body)
    if (!updatedJob) return res.status(404).json({ error: 'Job not found' })

    return res.status(204).end()
  }

  static partialUpdate: RequestHandler = async (req, res) => {
    const { params, body } = req
    const id = params['id'] as string

    const updatedJob = await JobModel.updateById(id, body)
    if (!updatedJob) return res.status(404).json({ error: 'Job not found' })

    return res.status(204).end()
  }

  static delete: RequestHandler = async (req, res) => {
    const { params } = req
    const id = params['id'] as string

    const deleted = await JobModel.deleteById(id)
    if (!deleted) return res.status(404).json({ error: 'Job not found' })

    return res.status(204).end()
  }
}

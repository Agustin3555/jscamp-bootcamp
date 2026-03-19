import type { RequestHandler } from 'express'
import { JobModel } from '../models/jobs.js'
import { validateJob, validatePartialJob } from '../schemas/jobs.js'

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export class JobMiddlewares {
  static validateId: RequestHandler = (req, res, next) => {
    let { id } = req.params

    if (!UUID_REGEX.test(id as string)) {
      return res.status(400).json({ error: 'Invalid id' })
    }

    const job = JobModel.getById(id as string)
    if (!job) return res.status(404).json({ error: 'Job not found' })

    req.job = job
    next()
  }

  static validateCreate: RequestHandler = (req, res, next) => {
    const result = validateJob(req.body)

    if (!result.success) {
      return res.status(400).json({
        error: 'Invalid request',
        details: result.error.message,
      })
    }

    req.body = result.data
    next()
  }

  static validateUpdate: RequestHandler = (req, res, next) => {
    const result = validatePartialJob(req.body)

    if (!result.success) {
      return res.status(400).json({
        error: 'Invalid request',
        details: result.error.message,
      })
    }

    req.body = result.data
    next()
  }
}

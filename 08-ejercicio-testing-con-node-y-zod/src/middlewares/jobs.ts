import type { Request, Response, NextFunction, RequestHandler } from 'express'
import { JobModel } from '../models/jobs.js'
import { validateJob, validatePartialJob } from '../schemas/jobs.js'

declare global {
  namespace Express {
    interface Request {
      job?: any
    }
  }
}

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export class JobMiddlewares {
  static validateId: RequestHandler = async (req, res, next) => {
    const id = req.params['id'] as string

    if (!UUID_REGEX.test(id)) {
      return res.status(400).json({ error: 'Invalid id' })
    }

    const job = await JobModel.getById(id)
    if (!job) return res.status(404).json({ error: 'Job not found' })

    req.job = job
    next()
  }

  static validateCreate: RequestHandler = (req, res, next) => {
    const result = validateJob(req.body)

    if (!result.success) {
      return res.status(400).json({
        error: 'Invalid request',
        details: JSON.parse(result.error.message),
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
        details: JSON.parse(result.error.message),
      })
    }

    req.body = result.data
    next()
  }
}

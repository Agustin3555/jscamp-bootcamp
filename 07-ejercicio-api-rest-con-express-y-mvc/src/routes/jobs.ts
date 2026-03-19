import { Router } from 'express'
import { JobController } from '../controllers/jobs.js'
import { JobMiddlewares } from '../middlewares/jobs.js'

export const jobsRouter: Router = Router()

jobsRouter.get('/', JobController.getAll)
jobsRouter.get('/:id', JobMiddlewares.validateId, JobController.getId)
jobsRouter.post('/', JobMiddlewares.validateCreate, JobController.create)
jobsRouter.patch(
  '/:id',
  JobMiddlewares.validateId,
  JobMiddlewares.validateUpdate,
  JobController.partialUpdate,
)
jobsRouter.put('/:id', JobMiddlewares.validateId, JobController.update)
jobsRouter.delete('/:id', JobMiddlewares.validateId, JobController.delete)

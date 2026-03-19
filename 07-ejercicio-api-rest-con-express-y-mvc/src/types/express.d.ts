import { Job } from '../types/job'

declare global {
  namespace Express {
    interface Request {
      job?: Job
    }
  }
}

import express, { type Application } from 'express'
import { jobsRouter } from './routes/jobs.ts'
import { corsMiddleware } from './middlewares/cors.ts'

const app: Application = express()

app.use(corsMiddleware())
app.use(express.json())

app.disable('x-powered-by')

app.use('/jobs', jobsRouter)

export default app

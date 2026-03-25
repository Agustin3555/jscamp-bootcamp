import express, { type Application } from 'express'
import { jobsRouter } from './routes/jobs.js'
import { corsMiddleware } from './middlewares/cors.js'

const app: Application = express()

app.use(corsMiddleware())
app.use(express.json())

app.disable('x-powered-by')

app.use('/jobs', jobsRouter)

export default app

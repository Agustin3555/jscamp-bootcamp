import cors from 'cors'

const ACCEPTED_ORIGINS = ['http://localhost:5173']

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      const isOriginAllowed = !origin || acceptedOrigins.includes(origin)

      return isOriginAllowed
        ? callback(null, true)
        : callback(new Error('Origen no permitido'))
    },
  })

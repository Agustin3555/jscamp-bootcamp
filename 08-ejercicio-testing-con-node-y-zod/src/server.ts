import app from './app.ts'
import { DEFAULTS } from './config.ts'

const { PORT } = DEFAULTS

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})

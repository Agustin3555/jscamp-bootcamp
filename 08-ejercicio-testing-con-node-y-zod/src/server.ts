import app from './app.js'
import { DEFAULTS } from './config.js'

const { PORT } = DEFAULTS

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})

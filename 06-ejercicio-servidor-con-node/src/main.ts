import { createServer } from 'node:http'
import { Send } from './types.js'
import { ROUTES } from './routes/index.js'

process.loadEnvFile()

const server = createServer(async (req, res) => {
  const { method, url = '' } = req
  const [pathname] = url.split('?')

  const send: Send = ({ status = 200, data }) => {
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(data))
  }

  const route = ROUTES.find(
    r => r.method === method && `/${r.route}` === pathname,
  )

  // muy bien diseñado! Me gusta como manejas el flujo de control
  if (route) return await route.handler({ req, res, send })

  return send({
    status: 404,
    data: { error: 'Not found' },
  })
})

const PORT = parseInt(process.env.PORT ?? '3000')

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

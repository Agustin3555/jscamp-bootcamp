import { Route } from '../types.js'

export const health: Route = {
  method: 'GET',
  route: 'health',

  handler: async ({ send }) => {
    return send({
      data: { status: 'ok', uptime: process.uptime() },
    })
  },
}

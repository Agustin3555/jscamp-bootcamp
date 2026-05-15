import { json } from 'node:stream/consumers'
import { Route } from '../types.js'
import { User, USERS } from '../data/users.js'
import { randomUUID } from 'node:crypto'

export const createUser: Route = {
  method: 'POST',
  route: 'users',

  handler: async ({ req, send }) => {
    // Muy bien usando Partial.
    // Lo haría con un Omit<User, 'id'> para evitar que se pueda enviar el `id`, y con un Partial<Omit<User, 'id'>> para que sean opcionales los campos que quedan.
    let body: Partial<Omit<User, 'id'>> | undefined

    try {
      body = (await json(req)) as Partial<Omit<User, 'id'>>
    } catch {
      return send({
        status: 400,
        data: { error: 'Invalid JSON body' },
      })
    }

    const { name, age = 18 } = body

    if (!name) {
      return send({
        status: 400,
        data: { error: 'The "name" field is required' },
      })
    }

    const newUser: User = { id: randomUUID(), name, age }
    USERS.push(newUser)

    return send({
      status: 201,
      data: newUser,
    })
  },
}

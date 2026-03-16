import { USERS } from '../data/users.js'
import { Route } from '../types.js'

export const getUsers: Route = {
  method: 'GET',
  route: 'users',

  handler: async ({ req, send }) => {
    const { url = '' } = req
    const [, querystring] = url.split('?')

    const searchParams = new URLSearchParams(querystring)

    let filteredUsers = USERS

    // Filtrado por nombre
    const name = searchParams.get('name')
    if (name) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(name.toLowerCase()),
      )
    }

    // Filtrado por rango de edad
    const minAge = searchParams.get('minAge')
    if (minAge) {
      filteredUsers = filteredUsers.filter(user => user.age >= Number(minAge))
    }

    const maxAge = searchParams.get('maxAge')
    if (maxAge) {
      filteredUsers = filteredUsers.filter(user => user.age <= Number(maxAge))
    }

    // Paginación
    let limit: null | string | number = searchParams.get('limit')
    let offset: null | string | number = searchParams.get('offset')

    if (limit && offset) {
      limit = Number(limit)
      offset = Number(offset)

      filteredUsers = filteredUsers.slice(offset, offset + limit)
    }

    return send({
      data: filteredUsers,
    })
  },
}

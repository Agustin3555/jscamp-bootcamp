import { USERS } from '../data/users.js'
import { Route } from '../types.js'

export const getUsers: Route = {
  method: 'GET',
  route: 'users',

  handler: async ({ req, send }) => {
    const { url = '' } = req
    const [, querystring] = url.split('?')

    const searchParams = new URLSearchParams(querystring)

    // Podemos hacer una copia, sin esto estamos haciendo referencia al mismo array. No hay problema en este caso porque es solo lectura, pero lo quiero dejar comentado como buena práctica
    let filteredUsers = [...USERS]

    // Filtrado por nombre
    const name = searchParams.get('name')
    if (name) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(name.toLowerCase()),
      )
    }

    // Filtrado por rango de edad
    const minAge = searchParams.get('minAge')
    // Validamos si es un numero valido
    const isValidMinAge = validateAge(minAge ?? '')
    
    if (minAge && isValidMinAge) {
      filteredUsers = filteredUsers.filter(user => user.age >= Number(minAge))
    }

    const maxAge = searchParams.get('maxAge')
    const isValidMaxAge = validateAge(maxAge ?? '')

    if (maxAge && isValidMaxAge) {
      filteredUsers = filteredUsers.filter(user => user.age <= Number(maxAge))
    }

    // Paginación
    let limit: null | string | number = searchParams.get('limit')
    let offset: null | string | number = searchParams.get('offset')

    // Validamos si son numeros validos
    const isValidLimitOffset = validateLimitOffset(limit ?? '', offset ?? '')
    
    if (limit && offset && isValidLimitOffset) {
      // Si el usuario pone un número con decimales, los redondeamos
      limit = Math.floor(Number(limit))
      offset = Math.floor(Number(offset))

      filteredUsers = filteredUsers.slice(offset, offset + limit)
    }

    return send({
      data: filteredUsers,
    })
  },
}

// Helper para veridicar que las edades sean correctas
const validateAge = (age: string, {
  min = 0,
  max = 150
}: {
  min?: number,
  max?: number
} = {}): boolean => {
  const ageNumber = Number(age)
  const isValid = !Number.isNaN(ageNumber) && ageNumber > min && ageNumber < max
  return isValid
}

// Helper para verificar que limit y offset sean numeros validos
const validateLimitOffset = (limit: string, offset: string): boolean => {
  const limitNumber = Number(limit)
  const offsetNumber = Number(offset)
  return !Number.isNaN(limitNumber) && !Number.isNaN(offsetNumber) && limitNumber > 0 && offsetNumber >= 0
}
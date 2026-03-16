import { Route } from '../types.js'
import { createUser } from './create-user.js'
import { getUsers } from './get-users.js'
import { health } from './health.js'

export const ROUTES: Route[] = [createUser, getUsers, health]

import { IncomingMessage, ServerResponse } from 'node:http'

export type Send = <T>(params: { status?: number; data: T }) => void

export interface Route {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  route: string

  handler: (params: {
    req: IncomingMessage
    res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
    send: Send
  }) => Promise<void>
}

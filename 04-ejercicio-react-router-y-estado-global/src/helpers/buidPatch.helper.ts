const root = 'https://jscamp-api.vercel.app/api'

export const buildPath =
  (collection: string) =>
  (...args: (string | number)[]) =>
    [root, collection, ...args].join('/')

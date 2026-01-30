const toKebab = (str: string) =>
  str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

export const classList = (
  ...values: (
    | undefined
    | string
    | number
    | { [key: string | number]: boolean }
  )[]
) =>
  values
    .filter(item => item !== undefined)
    .map(item => {
      if (typeof item === 'string') return item
      if (typeof item === 'number') return String(item)

      return Object.entries(item)
        .filter(([, value]) => value)
        .map(([key]) => toKebab(String(key)))
        .join(' ')
    })
    .join(' ')

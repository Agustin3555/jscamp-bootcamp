export const queryParams = (
  params: Record<string, number | string | undefined>
) => {
  const search = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '')
      search.append(key, typeof value === 'number' ? String(value) : value)
  })

  const qs = search.toString()
  return qs ? `?${qs}` : ''
}

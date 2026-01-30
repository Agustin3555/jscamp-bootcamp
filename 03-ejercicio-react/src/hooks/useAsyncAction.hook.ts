import { sleep } from '@/helpers/sleep.helper'
import { useCallback, useState } from 'react'

type Status = 'ready' | 'loading' | 'error' | 'success'

export const useAsyncAction = <T>(callback: () => Promise<T>) => {
  const [status, setStatus] = useState<Status>('ready')
  const [data, setData] = useState<T>()

  const fetch = useCallback(async () => {
    try {
      setStatus('loading')
      const result = await callback()
      setData(result)
      setStatus('success')
    } catch (error) {
      setStatus('error')
      throw error
    } finally {
      await sleep(250)
      setStatus('ready')
    }
  }, [callback])

  return { status, data, fetch }
}

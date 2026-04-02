import { useEffect,useState } from "react"
import { ApiErrorPlatform } from "../../infrastructure/errors/api-errors.error"

export interface UseQueryProps<T> {
  fn: () => Promise<T>;
  revalidate?:boolean,
  selector?: () => T | null;
  dispatchStoreCache?: (data:T) => void
}
export const useQuery = <T>({ 
  fn,
  revalidate = true,
  selector,
  dispatchStoreCache
}: UseQueryProps<T>) => {

  const dataFromStore = selector ? selector() : null
  const [internalData, setInternalData] = useState<T | null>(null)
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(!dataFromStore)

  useEffect(() => {
    if (!revalidate ) {
      setIsPending(false)
      return
    }
    const fetchData = async () => {
      try {
        setIsPending(true)
        const response = await fn()
        if (dispatchStoreCache) dispatchStoreCache(response)
        setInternalData(response)
      } catch (error) {
        if (error instanceof ApiErrorPlatform) {
          setError(error.message)
        } else {
          setError('An unexpected error occurred')
        }
      } finally {
        setIsPending(false)
      }
    }

    fetchData()
  }, [fn, dispatchStoreCache, revalidate])  

  return {
    isPending,
    error,
    data: dataFromStore ?? internalData
  }
}
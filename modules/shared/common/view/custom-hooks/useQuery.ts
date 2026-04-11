import { useEffect,useRef,useState } from "react"
import { ApiErrorPlatform } from "../../infrastructure/errors/api-errors.error"


/**
 * Hook para peticiones GET con caché en Redux store.
 * 
 * @param fn - Función que retorna la promesa del fetch
 * @param revalidate - Condición para hacer el fetch. Debe ser un boolean estable:
 *   - Arrays: `list.length === 0`
 *   - Objetos: `obj === null` o `obj === null || obj.data.length === 0`
 * @param selector - Selector del store de Redux para leer la data cacheada
 * @param dispatchStoreCache - Función para guardar la respuesta en el store
 * 
 * @example
 * // Array
 * const { data, isPending, error } = useQuery<Model3DEntity[]>({
 *   fn: () => render3DDI.listModels3D(),
 *   dispatchStoreCache: (data) => dispatch(setModels(data)),
 *   revalidate: models.length === 0,
 *   selector: () => models
 * })
 * 
 * // Objeto con paginación
 * const { data, isPending, error } = useQuery<ListPaginationDto<BackgroundMockupEntity[]>>({
 *   fn: () => render3DDI.listBackgrounds(),
 *   dispatchStoreCache: (data) => dispatch(setBackgrounds(data)),
 *   revalidate: backgrounds === null,
 *   selector: () => backgrounds
 * })
 */

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
  
  // refs para estabilizar funciones
  const fnRef = useRef(fn)
  const dispatchRef = useRef(dispatchStoreCache)
  fnRef.current = fn
  dispatchRef.current = dispatchStoreCache

  useEffect(() => {
    if (!revalidate) {
      setIsPending(false)
      return
    }

    const fetchData = async () => {
      try {
        setIsPending(true)
        const response = await fnRef.current()
        if (dispatchRef.current) dispatchRef.current(response)
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
  }, [revalidate])  // solo revalidate

  return { isPending, error, data: dataFromStore ?? internalData }
}
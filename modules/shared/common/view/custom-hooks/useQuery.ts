import { useEffect, useState } from "react"
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

  // 1. Obtenemos la data directamente del Store si el selector existe
  const dataFromStore = selector ? selector() : null;
  
  // Mantenemos un estado local solo como "respaldo" o para cuando no hay Store
  const [internalData, setInternalData] = useState<T | null>(null);
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(!dataFromStore); // Si hay data en store, no empezamos en "pending"

  useEffect(() => {
    // Si no hay que revalidar y ya tenemos data en el store, terminamos
    if (!revalidate && dataFromStore) {
      setIsPending(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsPending(true);
        const response = await fn(); 
        
        // 2. Sincronizamos con el Store Global
        if (dispatchStoreCache) {
          dispatchStoreCache(response);
        }
        
        // 3. Actualizamos el estado local (opcional, por si no usas selector)
        setInternalData(response);
      } catch (error) {
        if (error instanceof ApiErrorPlatform) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [fn, revalidate,dataFromStore,dispatchStoreCache]);

  return {
    isPending,
    error,
    // 4. Prioridad: Store > InternalData
    data: dataFromStore ?? internalData 
  };
};
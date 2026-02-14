
import { useEffect, useState } from "react"
import { authDIContainer } from "../../di/auth-container.di"
import { useDispatch, useSelector } from "react-redux"
import { setIdSession, setSession } from "../../store-slice/auth.slice"
import { RootState } from "@/store/boundStore"

export const useSession = () => {
    const [isPending, setIsPending] = useState(true) // Empieza en true
    const [error, setError] = useState<string | null>(null)
    const idSession = useSelector((state: RootState) => state.auth.idSession)
    const dispatch = useDispatch()

    useEffect(() => {
        let isMounted = true // Prevenir race conditions

        const validateSession = async () => {
            try {
                // 1. Verificar si ya hay sesión en Redux
                if (idSession) {
                    setIsPending(false)
                    return
                }

                // 2. Verificar si hay idSession en localStorage
                const localIdSession = authDIContainer.getLocalIdSession()
                if (localIdSession) {
                    // Validar que la sesión sigue siendo válida haciendo una petición
                    try {
                        const session = await authDIContainer.getProfile()
                        
                        if (isMounted) {
                            dispatch(setSession(session))
                            dispatch(setIdSession(session.user.id))
                            authDIContainer.saveDataSession(session)
                        }
                    } catch (err) {
                        // Token inválido o expirado
                        console.error('Session validation failed:', err)
                        authDIContainer.clearDataStorage()
                        if (isMounted) {
                            setError('Session expired')
                        }
                    }
                } else {
                    // No hay sesión guardada
                    if (isMounted) {
                        setError('No session found')
                    }
                }
            } catch (error) {
                console.error('Session error:', error)
                if (isMounted) {
                    setError('Failed to validate session')
                }
            } finally {
                if (isMounted) {
                    setIsPending(false)
                }
            }
        }

        validateSession()

        // Cleanup function
        return () => {
            isMounted = false
        }
    }, [dispatch, idSession])

    return {
        isPending,
        idSession,
        error,
        isAuthenticated: !!idSession && !error
    }
}
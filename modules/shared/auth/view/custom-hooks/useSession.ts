
import { useEffect, useState } from "react"
import { authDIContainer } from "../../di/auth-container.di"
import { useDispatch, useSelector } from "react-redux"
import { setSession } from "../../store-slice/auth.slice"
import { RootState } from "@/store/boundStore"
import { AuthTokenCache } from "@/modules/shared/common/infrastructure/services/auth-token-cache.service"

export const useSession = () => {
    const [isInternalLoading, setIsInternalLoading] = useState(true);
    // Usamos el selector de Redux como fuente de verdad para la autenticación
    const idSessionRedux = useSelector((state: RootState) => state.auth.idSession);
    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true;

        const initializeAuth = async () => {
            const localId = authDIContainer.getLocalIdSession();
            const currentToken = AuthTokenCache.getToken();

            // 1. Si ya hay datos en Redux, no necesitamos hacer nada más
            if (idSessionRedux && currentToken) {
                setIsInternalLoading(false);
                return;
            }

            // 2. Si hay ID local pero Redux está vacío (Refresh)
            if (localId && !idSessionRedux) {
                try {
                    const session = await authDIContainer.getProfile();
                    if (isMounted) {
                        AuthTokenCache.setToken(session.accessToken);
                        dispatch(setSession(session));
                        // IMPORTANTE: No seteamos Loading false aquí todavía.
                        // Dejamos que el cambio en idSessionRedux (vía Redux) 
                        // dispare la siguiente ejecución de este useEffect.
                    }
                } catch (err) {
                    console.log(err)
                    if (isMounted) {
                        authDIContainer.clearDataStorage();
                        setIsInternalLoading(false);
                    }
                }
                return;
            }

            // 3. Caso final: No hay ID local o ya se procesó todo
            setIsInternalLoading(false);
        };

        initializeAuth();
        return () => { isMounted = false; };
    }, [dispatch, idSessionRedux]); // <--- idSessionRedux aquí es clave

    return {
        // La sesión está pendiente si el loading interno es true 
        // O si tenemos un ID local pero Redux aún no se ha actualizado
        isPending: isInternalLoading || (!!authDIContainer.getLocalIdSession() && !idSessionRedux),
        isAuthenticated: !!idSessionRedux
    };
};
'use client'

import { ReactNode, useEffect } from "react"
import { useSession } from "../custom-hooks/useSession"
import { useRouter } from "next/navigation"


interface SessionValidatorWrapperProps{
    children:ReactNode
}
export default function SessionValidatorWrapper({children}:SessionValidatorWrapperProps) {
     const {  isPending, isAuthenticated } = useSession()
    const router = useRouter()
    
    useEffect(() => {
        // Solo redirigir cuando terminó de cargar y no hay sesión
        if (!isPending && !isAuthenticated) {
            router.push('/mokka/auth')
        }
    }, [isPending, isAuthenticated, router])
    
    
    if (isPending) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading session...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }
  return (
    <>
        {children}
    </>
  )
}

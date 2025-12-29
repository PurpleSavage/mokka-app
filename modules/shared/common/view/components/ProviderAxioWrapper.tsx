'use client'

import { ReactNode, useEffect } from "react"
import { HttpClientSingleton } from "../../infrastructure/adapters/http-service.adapter";


interface ProviderAxioWrapperProps{
    children:ReactNode
}

export default function ProviderAxiosWrapper({children}:ProviderAxioWrapperProps) {
    useEffect(() => {
        HttpClientSingleton.getInstance();
    }, []);
  return (
    <>
        {children}
    </>
  )
}

'use client'
import { ReactNode } from "react"
import { Provider } from "react-redux"
import { boundStore } from "@/store/boundStore"

interface ProviderReduxWrapperProps{
    children:ReactNode
}
export default function ProviderReduxWrapper({children}:ProviderReduxWrapperProps) {
  return (
    <Provider store={boundStore}>
        {children}
    </Provider>
  )
}

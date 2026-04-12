import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

/**
 * Tipos primitivos válidos para los valores de los parámetros de URL.
 * - `string` → valor de texto
 * - `number` → se convierte a string en la URL
 * - `boolean` → se convierte a "true" / "false"
 * - `null` → elimina el parámetro de la URL
 */
type ParamValue = string | number | boolean | null

/**
 * @hook useUrlParams
 * @description Hook para manejar los query params de la URL en Next.js.
 * Permite leer, escribir, eliminar y limpiar parámetros de la URL
 * sin causar un full reload, manteniendo el historial de navegación.
 *
 * ----------------------------------------------------------------
 * @methods
 *
 * setParam(key, value)
 *   Establece un único parámetro. Si value es null, lo elimina.
 *   @example setParam("tab", "background")
 *   @example setParam("page", 2)
 *   @example setParam("color", null) // elimina ?color
 *
 * setParams(entries)
 *   Establece múltiples parámetros en una sola navegación.
 *   @example setParams({ color: "#ff0000", page: 2, tab: "background" })
 *
 * getParam(key, fallback)
 *   Obtiene un parámetro casteado al tipo del fallback.
 *   Si no existe, retorna el fallback.
 *   @example getParam("page", 1)       // → number
 *   @example getParam("tab", "models") // → string
 *   @example getParam("open", false)   // → boolean
 *
 * removeParam(key)
 *   Elimina un único parámetro de la URL.
 *   @example removeParam("color") // ?color=red&page=1 → ?page=1
 *
 * removeParams(keys)
 *   Elimina múltiples parámetros en una sola navegación.
 *   @example removeParams(["color", "page"])
 *
 * clearParams()
 *   Elimina todos los parámetros, dejando solo el pathname.
 *   @example clearParams() // /editor?color=red&page=2 → /editor
 *
 * hasParam(key)
 *   Verifica si un parámetro existe en la URL actual.
 *   @example hasParam("tab") // → boolean
 *
 * searchParams
 *   Instancia de useSearchParams de Next.js para acceso directo.
 *
 * ----------------------------------------------------------------
 * @example
 * const { setParam, setParams, getParam, removeParam, hasParam } = useUrlParams()
 *
 * setParam("color", "#ff0000")
 * setParams({ color: "#ff0000", page: 2 })
 * const tab = getParam("tab", "models")
 * removeParam("color")
 * removeParams(["color", "page"])
 * clearParams()
 * hasParam("tab")
 */
export const useUrlParams = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const setParam = useCallback(<T extends ParamValue>(key: string, value: T) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === null || value === undefined) {
            params.delete(key)
        } else {
            params.set(key, String(value))
        }
        router.push(`?${params.toString()}`, { scroll: false })
    }, [searchParams, router])

    const setParams = useCallback((entries: Record<string, ParamValue>) => {
        const params = new URLSearchParams(searchParams.toString())
        Object.entries(entries).forEach(([key, value]) => {
            if (value === null || value === undefined) {
                params.delete(key)
            } else {
                params.set(key, String(value))
            }
        })
        router.push(`?${params.toString()}`, { scroll: false })
    }, [searchParams, router])

    const getParam = useCallback(<T extends ParamValue>(key: string, fallback: T): T => {
        const value = searchParams.get(key)
        if (value === null) return fallback
        if (typeof fallback === "number") return Number(value) as T
        if (typeof fallback === "boolean") return (value === "true") as T
        return value as T
    }, [searchParams])

    const removeParam = useCallback((key: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete(key)
        router.push(`?${params.toString()}`, { scroll: false })
    }, [searchParams, router])

    const removeParams = useCallback((keys: string[]) => {
        const params = new URLSearchParams(searchParams.toString())
        keys.forEach(key => params.delete(key))
        router.push(`?${params.toString()}`, { scroll: false })
    }, [searchParams, router])

    const clearParams = useCallback(() => {
        router.push(window.location.pathname, { scroll: false })
    }, [router])

    const hasParam = useCallback((key: string): boolean => {
        return searchParams.has(key)
    }, [searchParams])

    return {
        setParam,
        setParams,
        getParam,
        removeParam,
        removeParams,
        clearParams,
        hasParam,
        searchParams,
    }
}
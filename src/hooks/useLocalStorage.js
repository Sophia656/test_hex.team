import { useEffect, useState } from "react"

export const useLocalStorage = (key, defaultValue) => {
    const [state, setState] = useState((localStorage.getItem(key)||defaultValue))

    useEffect(() => {
        localStorage.setItem(key, (state))
    }, [state])

    return [state, setState]
}
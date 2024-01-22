import { useEffect, useState } from "react";

export const useDebounce = (value, interval = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
        }, interval)

        return () => clearInterval(timeout)
    }, [value])

    return debouncedValue
}
import { useEffect, useRef, useState } from "react"
import { TextInput } from "react-native"

export default function useInputFocus() {
    const [focusedInput, setFocusedInput] = useState<string | null>(null)

    const goalTitleInputRef = useRef<TextInput>(null)

    useEffect(() => {
        setTimeout(() => {
            goalTitleInputRef.current?.focus()
            setFocusedInput("goal")
        }, 100)
    }, [])

    return { focusedInput, setFocusedInput, goalTitleInputRef }
}

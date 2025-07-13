import AsyncStorage from "@react-native-async-storage/async-storage"
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react"

interface Meta {
    id: string
    created_at: string
    photo: string | null
    title: string
    motivation: string
    reward: string
    deadline: string
    category: string
}

interface GoalContextType {
    metas: Meta[]
    setMetas: React.Dispatch<React.SetStateAction<Meta[]>>
}

const GoalContext = createContext<GoalContextType | undefined>(undefined)

export const GoalProvider = ({ children }: { children: ReactNode }) => {
    const [metas, setMetas] = useState<Meta[]>([])

    useEffect(() => {
        const carregarMetas = async () => {
            const data = await AsyncStorage.getItem("metas")
            if (data) setMetas(JSON.parse(data))
        }
        carregarMetas()
    }, [])

    useEffect(() => {
        const salvarMetas = async () => {
            await AsyncStorage.setItem("metas", JSON.stringify(metas))
        }
        salvarMetas()
    }, [metas])

    return (
        <GoalContext.Provider value={{ metas, setMetas }}>
            {children}
        </GoalContext.Provider>
    )
}

export const useGoals = () => {
    const context = useContext(GoalContext)
    if (!context)
        throw new Error("useGoals deve ser usado dentro do GoalProvider")
    return context
}

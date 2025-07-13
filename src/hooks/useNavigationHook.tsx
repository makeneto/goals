import { useLocalSearchParams, useRouter } from "expo-router"

export default function useNavigationHook() {
    const { id } = useLocalSearchParams()
    const router = useRouter()

    return {
        id,
        router,
    }
}

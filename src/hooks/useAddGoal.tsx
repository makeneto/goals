import { useRouter } from "expo-router"
import { useState } from "react"
import { useGoals } from "../contexts/GoalContext"

export default function useAddGoal() {
    const { metas, setMetas } = useGoals()

    const gerarId = () =>
        Date.now().toString() + Math.random().toString(36).substring(2)
    const [goalTitle, setGoalTitle] = useState("")
    const [image, setImage] = useState<string | null>(null)
    const [goalMotivation, setGoalMotivation] = useState("")
    const [goalReward, setGoalReward] = useState("")
    const [goalDeadline, setGoalDeadline] = useState(new Date())
    const [goalCategory, setGoalCategory] = useState("pessoal")

    const router = useRouter()

    const adicionarMeta = () => {
        const now = new Date()
        now.setHours(0, 0, 0, 0)

        const createdAt = `${String(now.getDate()).padStart(2, "0")}/${String(
            now.getMonth() + 1
        ).padStart(2, "0")}/${String(now.getFullYear()).slice(-2)}`

        const nova = {
            id: gerarId(),
            photo: image,
            title: goalTitle,
            motivation: goalMotivation,
            reward: goalReward,
            deadline: goalDeadline.toISOString(),
            category: goalCategory,
            created_at: createdAt,
        }
        setMetas([nova, ...metas])
        setGoalTitle("")
        router.push("/")

        // Remover todas as metas
        // setMetas([])
    }

    return {
        adicionarMeta,
        image,
        setImage,
        goalTitle,
        setGoalTitle,
        goalMotivation,
        setGoalMotivation,
        goalReward,
        setGoalReward,
        goalDeadline,
        setGoalDeadline,
        goalCategory,
        setGoalCategory,
    }
}

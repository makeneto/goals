import Expired from "../components/Expired"

export function calculateDaysLeft(end: string): string | JSX.Element {
    const now = new Date()
    const deadline = new Date(end)

    // Zerar a hora de ambos para comparar só a data
    now.setHours(0, 0, 0, 0)
    deadline.setHours(0, 0, 0, 0)

    const diffTime = deadline.getTime() - now.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays > 1) {
        return `Faltam ${diffDays} dias`
    } else if (diffDays === 1) {
        return "Falta 1 dia"
    } else if (diffDays === 0) {
        return "Termina hoje!"
    } else {
        return <Expired />
    }
}

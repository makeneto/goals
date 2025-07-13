export function calculateProgress(start: string, end: string): number {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const today = new Date()

    const totalTime = endDate.getTime() - startDate.getTime()
    const timePassed = today.getTime() - startDate.getTime()

    if (isNaN(totalTime) || totalTime <= 0) {
        return 0
    }

    const progress = Math.min(Math.max(timePassed / totalTime, 0), 1)
    return Number((progress * 100).toFixed(0))
}

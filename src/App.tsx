// App.tsx
import Home from "@/app"
import AddGoals from "@/app/addGoal"
import React from "react"
import { GoalProvider } from "./contexts/GoalContext"

export default function App() {
    return (
        <GoalProvider>
            <Home />
            <AddGoals />
        </GoalProvider>
    )
}

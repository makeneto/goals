import { Link } from "expo-router"
import React from "react"
import { globalStyles } from "../styles/globalStyles"

export default function AddGoalButton() {
    return (
        <Link href="./addGoal" style={globalStyles.addGoal}>
            +
        </Link>
    )
}

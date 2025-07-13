import React from "react"
import { Text, View } from "react-native"
import { globalStyles } from "../styles/globalStyles"

export default function NotFoundGoals() {
    return (
        <View style={globalStyles.noGoalsWrapper}>
            <Text style={globalStyles.noGoals}>Nenhuma meta encontrada</Text>
        </View>
    )
}

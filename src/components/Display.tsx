import React from "react"
import { View } from "react-native"
import { globalStyles } from "../styles/globalStyles"

interface ChildrenProp {
    children: React.ReactNode
}

export default function Display({ children }: ChildrenProp) {
    return <View style={globalStyles.tela}>{children}</View>
}

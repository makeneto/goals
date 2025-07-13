import React from "react"
import { Text, View } from "react-native"
import { globalStyles } from "../styles/globalStyles"

interface NavProp {
    scrolled?: boolean
}

export default function NavMain({ scrolled = false }: NavProp) {
    return (
        <View
            style={[globalStyles.navMain, scrolled && globalStyles.navScrolled]}
        >
            <Text style={globalStyles.navText}>Metas</Text>
        </View>
    )
}

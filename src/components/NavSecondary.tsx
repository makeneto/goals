import { AntDesign } from "@expo/vector-icons"
import { Link } from "expo-router"
import React from "react"
import { Text, View } from "react-native"
import { globalStyles } from "../styles/globalStyles"

interface NavProp {
    children: React.ReactNode
    title: string
    scrolled?: boolean
}

export default function NavSecondary({
    children,
    title,
    scrolled = false,
}: NavProp) {
    return (
        <View
            style={[
                globalStyles.navSecondary,
                scrolled && globalStyles.navScrolled,
            ]}
        >
            <View style={globalStyles.navContainer}>
                <Link href="/" style={globalStyles.navText}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </Link>
                <Text style={globalStyles.navText}>{title} Meta</Text>
            </View>
            {children}
        </View>
    )
}

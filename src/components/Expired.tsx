import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import React from "react"
import { Text, View } from "react-native"
import { globalStyles } from "../styles/globalStyles"

export default function Expired() {
    return (
        <View style={globalStyles.expiredView}>
            <FontAwesome6 name="fire" size={12} color="#FF922B" />
            <Text style={globalStyles.expiredText}>Expirada</Text>
        </View>
    )
}

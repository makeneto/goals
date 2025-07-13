import { GoalProvider } from "@/src/contexts/GoalContext"
import { Slot } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Layout() {
    return (
        <GoalProvider>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: "#0D0D0D" }}
                edges={["left", "right", "bottom"]}
            >
                <Slot />
            </SafeAreaView>
        </GoalProvider>
    )
}

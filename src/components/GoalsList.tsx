import React from "react"
import { FlatList, Image, Text, View } from "react-native"
import { useGoals } from "../contexts/GoalContext"
import { globalStyles } from "../styles/globalStyles"
import { calculateProgress } from "../ts/calculateProgress"
import Expired from "./Expired"

export default function GoalsList() {
    const { metas } = useGoals()

    function calculateDaysLeft(end: string): string | JSX.Element {
        const now = new Date()
        const deadline = new Date(end)
        const diffTime = deadline.getTime() - now.setHours(0, 0, 0, 0)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays > 1) {
            return `Faltam ${diffDays} dias`
        } else if (diffDays === 1) {
            return "Falta 1 dia"
        } else if (diffDays === 0) {
            return "Termina hoje!"
        } else {
            console.log(diffDays)
            return <Expired />
        }
    }

    return (
        <FlatList
            data={metas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={globalStyles.item}>
                    <Image
                        style={globalStyles.goalCover}
                        source={
                            item.photo
                                ? { uri: item.photo }
                                : require("../images/image-not-found.png")
                        }
                    />
                    <View style={globalStyles.content}>
                        <View>
                            <Text
                                style={globalStyles.goalText}
                                numberOfLines={1}
                            >
                                {item.title}
                            </Text>
                            <Text style={globalStyles.daysLeft}>
                                {calculateDaysLeft(item.deadline)}
                            </Text>
                        </View>

                        <View style={globalStyles.progress}>
                            <Text style={globalStyles.progressText}>
                                {new Date(item.deadline) <
                                new Date(new Date().setHours(0, 0, 0, 0))
                                    ? "100%"
                                    : `${calculateProgress(
                                          item.created_at,
                                          item.deadline
                                      )}%`}
                            </Text>

                            <View style={globalStyles.progressBar}>
                                <View
                                    style={[
                                        globalStyles.progressLevel,
                                        {
                                            width:
                                                new Date(item.deadline) <
                                                new Date(
                                                    new Date().setHours(
                                                        0,
                                                        0,
                                                        0,
                                                        0
                                                    )
                                                )
                                                    ? "100%"
                                                    : `${calculateProgress(
                                                          item.created_at,
                                                          item.deadline
                                                      )}%`,
                                        },
                                    ]}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            )}
        />
    )
}

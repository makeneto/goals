import AddGoalButton from "@/src/components/AddGoalButton"
import Display from "@/src/components/Display"
import NavMain from "@/src/components/NavMain"
import NotFoundGoals from "@/src/components/NotFoundGoals"
import { useGoals } from "@/src/contexts/GoalContext"
import { globalStyles } from "@/src/styles/globalStyles"
import { calculateDaysLeft } from "@/src/ts/calculateDaysLeft"
import { calculateProgress } from "@/src/ts/calculateProgress"
import { Link } from "expo-router"
import { useState } from "react"
import { FlatList, Image, Text, TouchableHighlight, View } from "react-native"

export default function Home() {
    const { metas } = useGoals()
    const [scrolled, setScrolled] = useState<boolean>(false)

    return (
        <Display>
            <NavMain scrolled={scrolled} />

            {!metas.length ? (
                <NotFoundGoals />
            ) : (
                <FlatList
                    onScroll={(e) =>
                        setScrolled(e.nativeEvent.contentOffset.y > 0)
                    }
                    scrollEventThrottle={16}
                    data={metas}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Link href={`./goal/${item.id}`} asChild>
                            <TouchableHighlight>
                                <View style={globalStyles.item}>
                                    <Image
                                        style={globalStyles.goalCover}
                                        source={
                                            item.photo
                                                ? { uri: item.photo }
                                                : require("../src/images/image-not-found.png")
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
                                                {calculateDaysLeft(
                                                    item.deadline
                                                )}
                                            </Text>
                                        </View>

                                        <View style={globalStyles.progress}>
                                            <Text
                                                style={
                                                    globalStyles.progressText
                                                }
                                            >
                                                {new Date(item.deadline) <
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
                                                      )}%`}
                                            </Text>

                                            <View
                                                style={globalStyles.progressBar}
                                            >
                                                <View
                                                    style={[
                                                        globalStyles.progressLevel,
                                                        {
                                                            width:
                                                                new Date(
                                                                    item.deadline
                                                                ) <
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
                            </TouchableHighlight>
                        </Link>
                    )}
                />
            )}
            <AddGoalButton />
        </Display>
    )
}

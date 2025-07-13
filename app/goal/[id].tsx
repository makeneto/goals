import Display from "@/src/components/Display"
import { useGoals } from "@/src/contexts/GoalContext"
import { globalStyles } from "@/src/styles/globalStyles"
import { formatDateString } from "@/src/utils/formatDate"
import AntDesign from "@expo/vector-icons/AntDesign"
import Feather from "@expo/vector-icons/Feather"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

import { Link, useLocalSearchParams, useRouter } from "expo-router"
import { Alert, Image, Text, TouchableHighlight, View } from "react-native"

export default function GoalDetails() {
    const { id } = useLocalSearchParams()
    const { metas, setMetas } = useGoals()
    const router = useRouter()

    const goal = metas.find((meta: any) => meta.id === id)

    if (!goal) {
        return <Text>Meta não encontrada</Text>
    }

    const handleDelete = () => {
        Alert.alert(
            "Excluir meta",
            "Tem certeza que deseja Excluir esta meta?",
            [
                { text: "Cancelar" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: () => {
                        const atualizadas = metas.filter((m) => m.id !== id)
                        setMetas(atualizadas)
                        router.back()
                    },
                },
            ]
        )
    }

    return (
        <Display>
            <View style={globalStyles.navGoal}>
                <Link href="/">
                    <AntDesign name="arrowleft" size={24} color="white" />
                </Link>

                <MaterialIcons
                    name="delete-outline"
                    size={24}
                    color="white"
                    onPress={handleDelete}
                />
            </View>

            <View style={globalStyles.goalView}>
                <View style={globalStyles.goalContext}>
                    <View style={globalStyles.goalCoverView}>
                        {goal.photo ? (
                            <Image
                                source={{ uri: goal.photo }}
                                style={globalStyles.goalImage}
                            />
                        ) : null}
                        <Text style={globalStyles.goal}>{goal.title}</Text>
                    </View>

                    <View style={globalStyles.goalInfo}>
                        <View style={globalStyles.goalLabel}>
                            <Text style={globalStyles.goalLabelText}>
                                Motivação
                            </Text>
                            <Text style={globalStyles.goaltext}>
                                {goal.motivation
                                    ? goal.motivation
                                    : "Não especificado"}
                            </Text>
                        </View>

                        <View style={globalStyles.goalLabel}>
                            <Text style={globalStyles.goalLabelText}>
                                Recompensa
                            </Text>
                            <Text style={globalStyles.goaltext}>
                                {goal.reward ? goal.reward : "Não especificado"}
                            </Text>
                        </View>

                        <View style={globalStyles.goalLabel}>
                            <Text style={globalStyles.goalLabelText}>
                                Prazo
                            </Text>
                            <Text style={globalStyles.goaltext}>
                                {goal.deadline
                                    ? formatDateString(goal.deadline)
                                    : "Não especificado"}
                            </Text>
                        </View>

                        <View style={globalStyles.goalLabel}>
                            <Text style={globalStyles.goalLabelText}>
                                Categoria
                            </Text>
                            <Text style={globalStyles.editCategory}>
                                {goal.category
                                    ? goal.category
                                    : "Não especificado"}
                            </Text>
                        </View>
                    </View>
                </View>

                <TouchableHighlight
                    onPress={() => router.push(`/goal/${id}/edit`)}
                >
                    <View style={globalStyles.goalEditButton}>
                        <Feather name="edit-2" size={15} color="#FF922B" />
                        <Text style={globalStyles.buttonText}>Editar</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </Display>
    )
}

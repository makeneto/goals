import Display from "@/src/components/Display"
import NavSecondary from "@/src/components/NavSecondary"
import { useGoals } from "@/src/contexts/GoalContext"
import useNavigationHook from "@/src/hooks/useNavigationHook"
import { globalStyles } from "@/src/styles/globalStyles"
import { formatDate } from "@/src/utils/formatDate"
import { Feather, FontAwesome } from "@expo/vector-icons"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Picker } from "@react-native-picker/picker"
import * as ImagePicker from "expo-image-picker"
import { useEffect, useState } from "react"
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native"

export default function EditGoal() {
    const { metas, setMetas } = useGoals()
    const { id, router } = useNavigationHook()

    const [showPicker, setShowPicker] = useState(false)
    const [focusedInput, setFocusedInput] = useState<string | null>(null)
    const [scrolled, setScrolled] = useState(false)

    const goal = metas.find((meta: any) => meta.id === id)

    const [image, setImage] = useState(goal?.photo || "")
    const [title, setTitle] = useState(goal?.title || "")
    const [motivation, setMotivation] = useState(goal?.motivation || "")
    const [reward, setReward] = useState(goal?.reward || "")
    const [deadline, setDeadline] = useState(goal?.deadline || new Date())
    const [category, setCategory] = useState(goal?.category || "")

    useEffect(() => {
        setImage(goal?.photo || "")
    }, [goal?.photo])

    async function pickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    const handleSave = () => {
        const atualizadas = metas.map((m) =>
            m.id === id
                ? {
                      ...m,
                      title,
                      motivation,
                      reward,
                      category,
                      photo: image,
                      deadline:
                          typeof deadline === "string"
                              ? deadline
                              : deadline.toISOString(),
                  }
                : m
        )

        setMetas(atualizadas)
        router.push(`/goal/${id}`)
    }

    function handleDateChange(_: any, selectedDate?: Date) {
        setShowPicker(false)
        if (selectedDate) setDeadline(selectedDate)
    }

    const isDirty =
        title.length > 0 &&
        (title !== (goal?.title || "") ||
            motivation !== (goal?.motivation || "") ||
            reward !== (goal?.reward || "") ||
            category !== (goal?.category || "") ||
            image !== (goal?.photo || "") ||
            deadline !== (goal?.deadline || new Date()))

    if (!goal) return <Text>Meta não encontrada</Text>

    return (
        <Display>
            <NavSecondary title="Editar" scrolled={scrolled}>
                {isDirty && (
                    <TouchableOpacity onPress={handleSave}>
                        <Feather name="check" size={24} color="white" />
                    </TouchableOpacity>
                )}
            </NavSecondary>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={60}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                        onScroll={(e) =>
                            setScrolled(e.nativeEvent.contentOffset.y > 0)
                        }
                        scrollEventThrottle={16}
                    >
                        <View style={globalStyles.form}>
                            <View
                                style={{
                                    alignItems: "center",
                                    marginBottom: 24,
                                }}
                            >
                                <TouchableOpacity
                                    style={globalStyles.inputImage}
                                    onPress={pickImage}
                                    activeOpacity={0.8}
                                >
                                    {image ? (
                                        <Image
                                            source={{ uri: image }}
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            resizeMode="cover"
                                        />
                                    ) : (
                                        <>
                                            <FontAwesome
                                                name="camera"
                                                size={28}
                                                color="#FF922B"
                                            />
                                            <Text
                                                style={{
                                                    color: "#FF922B",
                                                    marginTop: 8,
                                                }}
                                            >
                                                Adicionar foto
                                            </Text>
                                        </>
                                    )}
                                </TouchableOpacity>
                            </View>

                            <View style={globalStyles.label}>
                                <Text style={globalStyles.labelText}>
                                    Título
                                </Text>

                                <TextInput
                                    placeholder="Objetivo específico e mensurável"
                                    placeholderTextColor="#404040"
                                    cursorColor="#FF922B"
                                    value={title}
                                    onChangeText={setTitle}
                                    style={[
                                        globalStyles.labelInput,
                                        focusedInput === "goal" &&
                                            globalStyles.inputFocused,
                                    ]}
                                    onFocus={() => setFocusedInput("goal")}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </View>

                            <View style={globalStyles.label}>
                                <Text style={globalStyles.labelText}>
                                    Motivação
                                </Text>
                                <TextInput
                                    placeholder="Por que essa meta é importante?"
                                    placeholderTextColor="#404040"
                                    cursorColor="#FF922B"
                                    value={motivation}
                                    onChangeText={setMotivation}
                                    style={[
                                        globalStyles.labelInput,
                                        focusedInput === "description" &&
                                            globalStyles.inputFocused,
                                    ]}
                                    onFocus={() =>
                                        setFocusedInput("description")
                                    }
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </View>

                            <View style={globalStyles.label}>
                                <Text style={globalStyles.labelText}>
                                    Recompensa
                                </Text>
                                <TextInput
                                    placeholder="Como você vai se recompensar?"
                                    placeholderTextColor="#404040"
                                    cursorColor="#FF922B"
                                    value={reward}
                                    onChangeText={setReward}
                                    style={[
                                        globalStyles.labelInput,
                                        focusedInput === "reward" &&
                                            globalStyles.inputFocused,
                                    ]}
                                    onFocus={() => setFocusedInput("reward")}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </View>

                            <View style={globalStyles.label}>
                                <Text style={globalStyles.labelText}>
                                    Prazo
                                </Text>

                                <TouchableOpacity
                                    onPress={() => setShowPicker(true)}
                                    activeOpacity={0.7}
                                    style={[
                                        globalStyles.labelInput,
                                        {
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontSize: 16,
                                        }}
                                    >
                                        {formatDate(new Date(deadline))}
                                    </Text>
                                    <Feather
                                        name="calendar"
                                        size={20}
                                        color="#ccc"
                                    />
                                </TouchableOpacity>

                                {showPicker && (
                                    <DateTimePicker
                                        value={new Date(deadline)}
                                        mode="date"
                                        display={
                                            Platform.OS === "ios"
                                                ? "spinner"
                                                : "default"
                                        }
                                        onChange={handleDateChange}
                                        locale="pt-PT"
                                    />
                                )}
                            </View>

                            <View style={globalStyles.label}>
                                <Text style={globalStyles.labelText}>
                                    Categoria
                                </Text>

                                <View style={[globalStyles.labelCategory]}>
                                    <Picker
                                        selectedValue={category}
                                        onValueChange={(itemValue) =>
                                            setCategory(itemValue)
                                        }
                                        style={{ color: "#fff" }}
                                        dropdownIconColor="#ccc"
                                    >
                                        <Picker.Item
                                            label="Pessoal"
                                            value="pessoal"
                                        />
                                        <Picker.Item
                                            label="Trabalho"
                                            value="trabalho"
                                        />
                                        <Picker.Item
                                            label="Estudos"
                                            value="estudos"
                                        />
                                        <Picker.Item
                                            label="Saúde"
                                            value="saude"
                                        />
                                    </Picker>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Display>
    )
}

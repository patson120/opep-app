

import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import {
    Dimensions,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { SafeAreaView } from "react-native-safe-area-context"
import { COLORS } from "../../Constants/Colors"

import * as Icon from "react-native-feather"
import DropdownComponent from "../../Components/DropdownComponent"
import InputField from "../../Components/InputField"
import PrimaryButton from "../../Components/PrimaryButton"
import { FONTS } from "../../Constants/Font"

import { DropdownItemType, GlobalUserState, Model, User } from "../../types"

import { useSelector } from "react-redux"
import { selectUser } from "../../Redux/users"
import Navigation from "../../Service/Navigation"
import useCars from "../../hooks/useCars"

import DateTimePicker from '@react-native-community/datetimepicker'



const { width } = Dimensions.get('window')

const DepenseForm = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedCar, setSelectedCar] = useState<Model | null>()
    const [montant, setMontant] = useState('')
    const [quantite, setQuantite] = useState('')


    const user: User = useSelector<GlobalUserState>(selectUser) as User
    const { cars } = useCars()

    const vehicles: DropdownItemType[] = cars.map(car => ({ label: car.model.libelle, value: car._id }))


    const handleSubmit = async () => {
        setIsLoading(true)
        const car = {
            // _id: immatriculation.trim(),
            // model: selectedModel!,
            // marque: selectedMarque!,
            // image: uploadResp.downloadUrl,
            userId: user._id!
        };
        // Add a new document in collection USER
        // await setDoc(doc(database, TABLE.CAR, `${car._id}`), { ...car })
        setIsLoading(false)
    }

    const [selectedType, setSelectedType] = useState(0)
    const types = ["Réparation", "Carburant", "Administration"]


    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState<"date" | "countdown" | "time" | 'datetime'>('date')
    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState("Entrer la date...")


    const onChange = (event: any, seletedDate: any) => {
        const currentDate = seletedDate || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)

        let tempDate = new Date(currentDate)
        const jour = Number(tempDate.getDate()) > 9 ? tempDate.getDate(): `0${tempDate.getDate()}`
        const mois = Number(tempDate.getMonth() + 1) > 9 ? (tempDate.getMonth() + 1): `0${tempDate.getMonth() + 1}`
        let fDate =   jour + '/' + mois + '/' + tempDate.getFullYear()
        let fTime = "Hours: " + tempDate.getHours() + " | minutes: " + tempDate.getMinutes()

        setSelectedDate(fDate)
    }

    return (
        <SafeAreaView
            style={{ backgroundColor: COLORS.white }}
            className="flex-1 ">
            <StatusBar style="dark" hidden />
            <KeyboardAwareScrollView
                className="flex-1 px-7 pt-6"
                behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
                <TouchableOpacity
                    onPress={() => Navigation.back()}>
                    <Icon.ChevronLeft color={COLORS.black} strokeWidth={3} />
                </TouchableOpacity>

                <View className="mt-8">
                    <Text
                        style={{ fontFamily: FONTS.Bold }}
                        className='text-lg'>
                        Ajouter une dépense</Text>
                    <Text
                        style={{ fontFamily: FONTS.Regular }}
                        className="text-left mt-1 mb-2 text-sm text-[#9D9D9D]"
                    >
                        Veuillez renseigner des informations sur tous les champs ci-dessous
                    </Text>
                </View>

                {/* Type Depenses */}
                <View className="mt-3 mb-2">
                    <Text
                        style={{ fontFamily: FONTS.Regular }}
                        className="mb-3 text-sm">Type dépense</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                            types.map((type, index) => (
                                <Pressable
                                    onPress={() => setSelectedType(index)}
                                    style={{
                                        borderColor: selectedType == index ? COLORS.black : COLORS.bgGray,
                                        borderWidth: 1.4
                                    }}
                                    key={`${index}`} className="px-4 py-2 mr-3 rounded-md">
                                    <Text
                                        style={{ fontFamily: selectedType == index ? FONTS.SemiBold : FONTS.Regular, opacity: selectedType == index ? 1 : 0.5 }}
                                        className="text-sm">{type}</Text>
                                </Pressable>
                            ))
                        }
                    </ScrollView>
                </View>

                <InputField
                    label={'Montant'}
                    placeholder="Ex: 3500"
                    data={montant}
                    setData={setMontant}
                />

                <InputField
                    label={'Quantité (en L)'}
                    placeholder="Ex: 03"
                    data={quantite}
                    setData={setQuantite}
                />

                <View className="mt-3">
                    <DropdownComponent
                        label="Véhicule concerné"
                        data={vehicles}
                        onChangeValue={setSelectedCar}
                        placeholder="Choisir le véhicule..."
                    />
                </View>


                <TouchableOpacity
                    onPress={() => { setShow(true) }}
                    className="border border-gray-100 h-12 rounded-md mt-3 pl-3 justify-center"
                >
                    <Text
                        className="text-sm"
                        style={{ fontFamily: FONTS.Regular, opacity: 0.5 }}>{selectedDate}</Text>
                </TouchableOpacity>

                <View className="mt-10 mb-8 flex-row justify-between" >
                    <TouchableOpacity
                        style={{ width: width / 3 }}
                        className='border border-gray-300 rounded-xl h-12 p-2 justify-center items-center'
                        onPress={() => Navigation.back()}>
                        <Text
                            style={{ fontFamily: FONTS.Regular }}
                            className="text-left text-base text-black">
                            Annuler
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{ width: width * (2 / 3) - 80 }}>
                        <PrimaryButton
                            isLoading={isLoading}
                            label="Valider"
                            onPress={handleSubmit}
                            marginTop={0}
                        />
                    </View>
                </View>
                <View className="mt-4">
                    {
                        show &&
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    }
                </View>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default DepenseForm

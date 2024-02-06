

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

import { Depense, DropdownItemType, Model } from "../../types"

import Navigation from "../../Service/Navigation"
import useCars from "../../hooks/useCars"

import DateTimePicker from '@react-native-community/datetimepicker'

import { doc, setDoc } from "firebase/firestore"
import moment from "moment"
import uuid from 'react-native-uuid'
import { TABLE } from "../../Constants/Table"
import { database } from "../../config/firebase"
import useTypeDepense from "../../hooks/useTypeDepense"
import SimpleToast from 'react-native-simple-toast'



const { width } = Dimensions.get('window')
const pattern = 'YYYY/MM/DD HH:mm:ss'

const DepenseForm = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedCar, setSelectedCar] = useState<Model | null>()
    const [montant, setMontant] = useState('')
    const [quantite, setQuantite] = useState('')

    const { cars } = useCars()
    const vehicles: DropdownItemType[] = cars.map(car => ({ label: car.model.libelle, value: car._id }))

    const [selectedType, setSelectedType] = useState(0)
    const { types } = useTypeDepense()

    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState<"date" | "countdown" | "time" | 'datetime'>('date')
    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState(moment().format(pattern))

    const handleSubmit = async () => {
        setIsLoading(true)
        const depense: Depense = {
            _id: uuid.v4().toString(),
            date: selectedDate,
            description: '',
            montant: montant,
            quantite: Number(quantite),
            type_depense: types[selectedType]._id,
            vehiculeId: selectedCar?._id!
        };
        // Add a new document in collection DEPENSE
        await setDoc(doc(database, TABLE.DEPENSE, `${depense._id}`), { ...depense })
        setIsLoading(false)
        SimpleToast.show("Dépense ajoutée avec succès", 3)
        Navigation.back()
    }
    const onChange = (event: any, seletedDate: any) => {
        const currentDate = seletedDate || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
        // let tempDate = new Date(currentDate)
        // let fTime = "Hours: " + tempDate.getHours() + " | minutes: " + tempDate.getMinutes()
        setSelectedDate(moment(currentDate).format(pattern))
    }

    const verifiedtype = (type: string): boolean => {
        if (types.length === 0) return false
        return types[selectedType]!.libelle.toLowerCase().includes(type.toLowerCase())
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
                {
                    types.length > 0 &&
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
                                            borderColor: selectedType == index ? COLORS.secondary : COLORS.bgGray,
                                            borderWidth: 1.4
                                        }}
                                        key={`${index}`} className="px-4 py-2 mr-3 rounded-md">
                                        <Text
                                            style={{
                                                fontFamily: selectedType == index ? FONTS.SemiBold : FONTS.Regular,
                                                color: selectedType == index ? COLORS.secondary : COLORS.black,
                                                opacity: selectedType == index ? 1 : 0.5
                                            }}
                                            className="text-sm">{type.libelle}</Text>
                                    </Pressable>
                                ))
                            }
                        </ScrollView>
                    </View>
                }
                <InputField
                    label={'Montant'}
                    placeholder="Ex: 3500"
                    data={montant}
                    setData={setMontant}
                />

                {
                    verifiedtype("carburant") &&
                    <InputField
                        label={'Quantité (en L)'}
                        placeholder="Ex: 03"
                        data={quantite}
                        setData={setQuantite}
                    />
                }
                <View className="mt-3">
                    <DropdownComponent
                        label="Véhicule concerné"
                        data={vehicles}
                        onChangeValue={setSelectedCar}
                        placeholder="Choisir le véhicule..."
                    />
                </View>

                <Text
                    style={{ fontFamily: FONTS.Regular }}
                    className='text-sm mt-2'>
                    Entrez la date</Text>
                <TouchableOpacity
                    onPress={() => { setShow(true) }}
                    className="border border-gray-100 h-12 rounded-lg mt-1 pl-3 justify-center">
                    <Text
                        className="text-sm"
                        style={{ fontFamily: FONTS.Regular, opacity: 0.5 }}>{selectedDate}</Text>
                </TouchableOpacity>

                <View className="mt-10 mb-8 flex-row justify-between">
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

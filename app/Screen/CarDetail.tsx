

import { View, Text, SafeAreaView, Image, TouchableOpacity, GestureResponderEvent, ScrollView, Pressable } from 'react-native'
import React, { FC, useState } from 'react'
import { COLORS } from '../Constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { useRoute } from '@react-navigation/native'
import * as Icon from 'react-native-feather'
import { Car } from '../types'
import { FONTS } from '../Constants/Font'
import Navigation from '../Service/Navigation'
import CardTypeDepense from '../Components/CardTypeDepense'
import DepenseItem from '../Components/DepenseItem'

const CarDetail = () => {

    const [selectedType, setSelectedType] = useState(0)

    const { params } = useRoute()
    const { car } = params as Car

    const types: string[] = ["Tous", "Réparation", "Chargement", "Administration"]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar style="dark" backgroundColor={COLORS.white} hidden />
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1 px-6 pt-6">
                <View
                    style={{ backgroundColor: COLORS.bgGray }}
                    className="rounded-md pb-3">
                    <View className="flex-row mt-1 justify-between items-end">
                        <TouchableOpacity
                            onPress={() => Navigation.back()}
                        >
                            <Icon.ChevronLeft color={COLORS.gray} strokeWidth={2} width={35} height={35} />
                        </TouchableOpacity>
                        <Icon.MoreVertical color={COLORS.gray} strokeWidth={2} width={30} height={30} />
                    </View>

                    {/* Image */}
                    <View className="h-40 rounded-lg overflow-hidden m-4 mb-3">
                        <Image
                            source={{ uri: car.image }}
                            className="h-full w-full"
                        />
                    </View>

                    <View className="mx-4">
                        <View className="flex-row space-x-1 justify-start items-center">
                            <Text
                                className='text-sm'
                                style={{ fontFamily: FONTS.SemiBold, opacity: 0.8 }}>
                                {car.model.libelle}
                            </Text>
                            <Text
                                className='text-sm'
                                style={{ fontFamily: FONTS.Regular, opacity: 0.8 }}>
                                * {car._id}
                            </Text>
                        </View>
                        <Text
                            style={{ fontFamily: FONTS.Regular }}
                            className="text-left text-xs text-[#9D9D9D] mt-2">
                            Ajouter le 20 Octobre 2021
                        </Text>
                    </View>
                </View>
                {/* Résumé */}
                <View>
                    <Text
                        className='mt-4 mb-2 text-lg'
                        style={{ fontFamily: FONTS.Bold, opacity: 0.8 }}>
                        Résumé</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <CardTypeDepense
                            label='Réparation'
                            value='1 000 000 Fcfa'
                            onPress={() => { }}>
                            <Icon.Tool color={COLORS.gray} strokeWidth={2} width={25} height={25} />
                        </CardTypeDepense>

                        <CardTypeDepense
                            label='Chargement'
                            value='500 000 Fcfa'
                            onPress={() => { }}>
                            <Icon.Thermometer color={COLORS.gray} strokeWidth={2} width={25} height={25} />
                        </CardTypeDepense>

                        <CardTypeDepense
                            label='Administration'
                            value='150 000 Fcfa'
                            onPress={() => { }}>
                            <Icon.FileText color={COLORS.gray} strokeWidth={2} width={25} height={25} />
                        </CardTypeDepense>
                    </ScrollView>

                    {/* Type Depenses */}
                    <View className="mt-7">
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {
                                types.map((type, index) => (
                                    <Pressable
                                        onPress={() => setSelectedType(index)}
                                        style={{ backgroundColor: selectedType == index ? COLORS.bgGray : COLORS.white }}
                                        key={`${index}`} className="px-4 py-2 mr-3 rounded-md">
                                        <Text
                                            style={{ fontFamily: selectedType == index ? FONTS.SemiBold : FONTS.Regular, opacity: selectedType == index ? 1 : 0.5 }}
                                            className="text-sm">{type}</Text>
                                    </Pressable>
                                ))
                            }
                        </ScrollView>
                    </View>

                    {/* Total amount */}

                    <View className="mt-6 flex-row justify-between">
                        <Text
                            style={{ fontFamily: FONTS.SemiBold }}
                            className="text-lg">Total</Text>
                        <Text
                            style={{ fontFamily: FONTS.SemiBold, color: COLORS.thirdth }}
                            className="text-sm">280.000 Fcfa</Text>
                    </View>


                    {/* Liste des dépenses */}
                    <View className="mt-5 mb-10">
                        <DepenseItem
                            label='Achat de Carburant'
                            value1='20L/11 Octobre 2021'
                            value2='15.000 Fcfa'
                        />
                        <DepenseItem
                            label='Achat de Carburant'
                            value1='20L/11 Octobre 2021'
                            value2='15.000 Fcfa'
                        />
                        <DepenseItem
                            label='Achat de Carburant'
                            value1='20L/11 Octobre 2021'
                            value2='15.000 Fcfa'
                        />
                        <DepenseItem
                            label='Changement de rétroviseurs'
                            value1='03 Décembre 2021'
                            value2='15.000 Fcfa'
                        />
                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CarDetail




import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { COLORS } from '../Constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { useRoute } from '@react-navigation/native'
import * as Icon from 'react-native-feather'
import { Car, Depense } from '../types'
import { FONTS } from '../Constants/Font'
import Navigation from '../Service/Navigation'
import CardTypeDepense from '../Components/CardTypeDepense'
import DepenseItem from '../Components/DepenseItem'
import moment from 'moment'
import useDepense from '../hooks/useDepense'
import useTypeDepense from '../hooks/useTypeDepense'

const CarDetail = () => {

    const { getDepensesByIdCar } = useDepense()
    const { params } = useRoute()
    const { car } = params as Car

    const [selectedType, setSelectedType] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [depenses, setDepenses] = useState<Depense[]>([])

    const [sumEntretiens, setSumEntretiens] = useState(0)
    const [sumReparations, setSumReparations] = useState(0)
    const [sumConsommations, setSumConsommations] = useState(0)
    const [sumAdministrations, setSumAdministrations] = useState(0)
    const [sumAutres, setSumAutres] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)

    let { types } = useTypeDepense()
    types = [{"_id": "Tous", "libelle": "Tous"}, ...types]    


    const getDepenses = async () => {
        setIsLoading(true)
        // setTotalAmount(0)
        getDepensesByIdCar(car._id).then(result => {
            setDepenses(result)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getDepenses()
    }, [])


    const sumMontant = (libelle: string) => {
        const type = types.find(type => type.libelle.toLowerCase().includes(libelle.toLowerCase()))?._id
        const deps = depenses.filter(dep => dep.type_depense === type)
        const somme = deps.reduce((acc, dep) => acc + dep.montant, 0)
        setTotalAmount(s => s + somme)
        return somme
    }

    useLayoutEffect(() => {
        setIsLoading(true)
        setTotalAmount(0)
        setSumEntretiens(sumMontant('Entretien'))
        setSumReparations(sumMontant('Réparation'))
        setSumConsommations(sumMontant('Consommation'))
        setSumAdministrations(sumMontant('Administration'))
        setSumAutres(sumMontant('Autres'))
        setIsLoading(false)
    }, [depenses])


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
                            source={{ uri: car.images[0].url }}
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
                            Ajouter le {moment(car.createdAt).format('llll')}
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
                            label='Entretiens'
                            value={ `${sumEntretiens}`}
                            onPress={() => { }}>
                            <Icon.Crosshair color={COLORS.secondary} strokeWidth={2} width={25} height={25} />
                        </CardTypeDepense>

                        <CardTypeDepense
                            label='Réparations'
                            value={ `${sumReparations}`}
                            onPress={() => { }}>
                            <Icon.Tool color={COLORS.secondary} strokeWidth={2} width={25} height={25} />
                        </CardTypeDepense>

                        <CardTypeDepense
                            label='Consommations'
                            value={ `${sumConsommations}`}
                            onPress={() => { }}>
                            <Icon.Thermometer color={COLORS.secondary} strokeWidth={2} width={25} height={25} />
                        </CardTypeDepense>

                        <CardTypeDepense
                            label='Administrations'
                            value={ `${sumAdministrations}`}
                            onPress={() => { }}>
                            <Icon.FileText color={COLORS.secondary} strokeWidth={2} width={25} height={25} />
                        </CardTypeDepense>

                        <CardTypeDepense
                            label='Aures'
                            value={ `${sumAutres}`}
                            onPress={() => { }}>
                            <Icon.DollarSign color={COLORS.secondary} strokeWidth={2} width={25} height={25} />
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
                                            className="text-sm">{type.libelle}</Text>
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
                            className="text-sm">{totalAmount} Fcfa</Text>
                    </View>

                    {/* Liste des dépenses */}
                    <View className="mt-5 mb-10">
                        { depenses.map((dep) => (
                                <DepenseItem
                                    label={dep.description}
                                    value1={dep.quantite ? `${dep.quantite}L/ ${moment(dep.date).format('LLL')}` : `${moment(dep.date).format('LLL')}`}
                                    value2={`${dep.montant}`}
                                    key={`${dep._id}`}
                                />))
                        }
                        {
                            !depenses.length &&
                            <View className="flex-1 justify-center items-center h-52">
                                <Text
                                    style={{ fontFamily: FONTS.Regular, color: COLORS.gray, opacity: 0.6 }}
                                    className="text-sm">Aucune dépense...</Text>
                            </View>
                        }

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CarDetail


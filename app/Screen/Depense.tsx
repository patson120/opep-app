
import { View, Text, SafeAreaView, Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../Constants/Colors'
import { StatusBar } from 'expo-status-bar'
import BigButton from '../Components/BigButton'
import Navigation from '../Service/Navigation'
import { FONTS } from '../Constants/Font'
import * as Icon from 'react-native-feather'
import { ScrollView } from 'react-native-gesture-handler'
import DepenseGroup from '../Components/DepenseGroup'
import DepenseItem from '../Components/DepenseItem'
import { Car, Depense as D } from '../types'
import carService from '../Service/Car'
import useDepense from '../hooks/useDepense'
import moment from 'moment'
import { collection, getAggregateFromServer, sum } from 'firebase/firestore'
import { database } from '../config/firebase'
import { TABLE } from '../Constants/Table'

const Depense = () => {

    const { getDepenses } = useDepense()
    const [selectedPeriod, setSelectedPeriod] = useState(0)
    const [depenses, setDepenses] = useState<D[]>([])
    const periodes = ["Cette année", "Ce mois", "Cette semaine", "Aujourd'hui", "Dernier semestre"]


    useEffect(() => {
        const getAllCars = async () => {
            const cars = await carService.getCars() as Car[]
            const result = await getDepenses(cars.map(car => car._id))
            setDepenses(result)
        }
        getAllCars()
    }, [])


    useEffect(() => {
        const getMontant = async () => {
            const coll = collection(database, TABLE.DEPENSE);
            const snapshot = await getAggregateFromServer(coll, {
                montant: sum('montant')
            });

            console.log('MontantTotal: ', snapshot.data().montant);
        }

        getMontant()
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar style="dark" backgroundColor={COLORS.white} />
            <View className="flex-1 px-6 pt-5">
                <View className="w-24 pt-2">
                    <Image
                        source={require('../Assets/img/logo1 1.png')}
                        className="mb-5 w-auto"
                    />
                </View>
                <BigButton
                    title="Ajouter une dépense"
                    subTitle="Ajouter une dépense maintenant"
                    onPress={() => { Navigation.navigate("DepenseForm") }}
                >
                    <Icon.DollarSign color={COLORS.gray} strokeWidth={2} width={30} height={30} />
                </BigButton>

                <View className="h-10 mt-6">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                            periodes.map((periode, index) => (
                                <Pressable
                                    onPress={() => setSelectedPeriod(index)}
                                    style={{
                                        borderColor: selectedPeriod == index ? COLORS.secondary : COLORS.bgGray,
                                        borderWidth: 1.4
                                    }}
                                    key={`${index}`} className="px-4 py-2 mr-3 rounded-md">
                                    <Text
                                        style={{
                                            fontFamily: selectedPeriod == index ? FONTS.SemiBold : FONTS.Regular,
                                            color: selectedPeriod == index ? COLORS.secondary : COLORS.black,
                                            opacity: selectedPeriod == index ? 1 : 0.5
                                        }}
                                        className="text-sm">{periode}</Text>
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
                        className="text-sm">1.650.000 Fcfa</Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className='mt-4'>
                    <DepenseGroup
                        title="Réparation"
                        subTitle="650.000 fcfa"
                        onPress={() => { }}>
                        <Icon.Tool color={COLORS.gray} strokeWidth={2} width={25} height={25} />
                    </DepenseGroup>

                    <DepenseGroup
                        title="Chargement"
                        subTitle="80.000 fcfa"
                        onPress={() => { }}>
                        <Icon.Thermometer color={COLORS.gray} strokeWidth={2} width={25} height={25} />
                    </DepenseGroup>

                    <DepenseGroup
                        title="Administration"
                        subTitle="52.000 fcfa"
                        onPress={() => { }}>
                        <Icon.FileText color={COLORS.gray} strokeWidth={2} width={25} height={25} />
                    </DepenseGroup>

                    <DepenseGroup
                        title="Autres"
                        subTitle="842.000 fcfa"
                        onPress={() => { }}>
                        <Icon.DollarSign color={COLORS.gray} strokeWidth={2} width={25} height={25} />
                    </DepenseGroup>

                    <View className="mt-4 flex-row justify-between">
                        <Text
                            style={{ fontFamily: FONTS.SemiBold }}
                            className="text-lg">Dépense récentes</Text>
                        <TouchableOpacity
                            onPress={() => console.log("Voir plus")}>
                            <Text
                                style={{ fontFamily: FONTS.Regular, color: COLORS.gray, opacity: 0.6 }}
                                className="text-sm">Voir plus</Text>
                        </TouchableOpacity>
                    </View>


                    {/* Liste des dépenses */}
                    <View className="mt-4 mb-10">
                        {
                            depenses.map((dep) => (
                                <DepenseItem
                                    label={dep.description}
                                    value1={dep.quantite ? `${dep.quantite}L/ ${moment(dep.date).format('LLL')}` : `${moment(dep.date).format('LLL')}`}
                                    value2={`${dep.montant} Fcfa`}
                                    key={`${dep._id}`}
                                />)
                            )
                        }
                    </View>

                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default Depense




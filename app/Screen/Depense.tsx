
import { StatusBar } from 'expo-status-bar'
import moment from 'moment'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, Image, Pressable, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import * as Icon from 'react-native-feather'
import { ScrollView } from 'react-native-gesture-handler'
import BigButton from '../Components/BigButton'
import DepenseGroup from '../Components/DepenseGroup'
import DepenseItem from '../Components/DepenseItem'
import { COLORS } from '../Constants/Colors'
import { FONTS } from '../Constants/Font'
import Navigation from '../Service/Navigation'
import useCars from '../hooks/useCars'
import useDepense from '../hooks/useDepense'
import useTypeDepense from '../hooks/useTypeDepense'
import { Depense as D, Period } from '../types'

const day = moment().day() - 1
const toDay = new Date(moment().year(), moment().month(), moment().date(), 0, 0, 0)
const s = moment().add(-6, 'months')
const semester = new Date(s.year(), s.month(), s.date(), 0, 0, 0)

const Depense = () => {
    const { getDepensesByPeriod } = useDepense()
    const [selectedPeriod, setSelectedPeriod] = useState(0)
    const [depenses, setDepenses] = useState<D[]>([])
    const periodes: Period[] = [
        {
            libelle: "Aujourd'hui",
            value: `${moment(toDay).format()}`
        },
        {
            libelle: "Cette semaine",
            value: moment().add(-day, 'days').format()
        },
        {
            libelle: "Ce mois",
            value: moment(new Date(moment().year(), moment().month(), 1, 0, 0, 0)).format()
        },
        {
            libelle: "Dernier semestre",
            value: `${moment(semester).format()}`
        },
        {
            libelle: "Cette année",
            value: `${moment().year()}-01-01T00:00:00+00:00`
        },
        {
            libelle: "Année dernière",
            value: `${moment().year() - 1}-01-01T00:00:00+00:00`
        }
    ]

    const [sumReparations, setSumReparations] = useState(0)
    const [sumConsommations, setSumConsommations] = useState(0)
    const [sumAdministrations, setSumAdministrations] = useState(0)
    const [sumAutres, setSumAutres] = useState(0)
    const [sumEntretien, setSumEntretien] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const { types } = useTypeDepense()
    const { getImmatriculations } = useCars()

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
        setSumEntretien(sumMontant('Entretien'))
        setSumReparations(sumMontant('Réparation'))
        setSumConsommations(sumMontant('Consommation'))
        setSumAdministrations(sumMontant('Administration'))
        setSumAutres(sumMontant('Autre'))
        setIsLoading(false)
    }, [types, depenses])

    useEffect(() => {
        getDepenses()
    }, [selectedPeriod])


    const getDepenses = async () => {
        setIsLoading(true)
        setTotalAmount(0)
        let endDate = ''
        
        if (periodes[selectedPeriod].libelle === "Année dernière") {
            endDate = `${moment().year() - 1}-12-31T23:59:59+00:00`
        }
        getImmatriculations().then(immatriculations => {
            const period = periodes[selectedPeriod].value
            getDepensesByPeriod(immatriculations as string[], period, endDate).then(result => {
                setDepenses(result)
                setIsLoading(false)
            })
        });
    }

    const onRefresh = async () => {
        setIsLoading(true)
        await getDepenses()
        setIsLoading(false)
    }

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
                                        className="text-sm">{periode.libelle}</Text>
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

                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => `${item}`}
                    data={[1]}
                    refreshing={isLoading}
                    onRefresh={onRefresh}
                    renderItem={() => <View className='mt-4'>
                        <View>
                            <DepenseGroup
                                title="Entretiens"
                                subTitle={`${sumEntretien}`}
                                onPress={() => { }}>
                                <Icon.Crosshair color={COLORS.gray} strokeWidth={2} width={25} height={25} />
                            </DepenseGroup>

                            <DepenseGroup
                                title="Réparations"
                                subTitle={`${sumReparations}`}
                                onPress={() => { }}>
                                <Icon.Tool color={COLORS.gray} strokeWidth={2} width={25} height={25} />
                            </DepenseGroup>

                            <DepenseGroup
                                title="Consommations"
                                subTitle={`${sumConsommations}`}
                                onPress={() => { }}>
                                <Icon.Thermometer color={COLORS.gray} strokeWidth={2} width={25} height={25} />
                            </DepenseGroup>

                            <DepenseGroup
                                title="Administrations"
                                subTitle={`${sumAdministrations}`}
                                onPress={() => { }}>
                                <Icon.FileText color={COLORS.gray} strokeWidth={2} width={25} height={25} />
                            </DepenseGroup>

                            <DepenseGroup
                                title="Autres"
                                subTitle={`${sumAutres}`}
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
                                            value2={`${dep.montant}`}
                                            key={`${dep._id}`}
                                        />)
                                    )
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
                    </View>}
                />

            </View>
        </SafeAreaView>
    )
}

export default Depense


import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { Car} from '../types'
import { FONTS } from '../Constants/Font'
import { COLORS } from '../Constants/Colors'
import useDepense from '../hooks/useDepense'
import moment from 'moment'
import useTypeDepense from '../hooks/useTypeDepense'

interface Props {
    onPress: () => void
    car: Car
}


const THIS_MONTH = moment(new Date(moment().year(), moment().month(), 1, 0, 0, 0)).format()

const CarCard: FC<Props> = ({ onPress, car }) => {

    const { getDepensesByPeriod } = useDepense()
    const { types } = useTypeDepense()

    const [montant, setMontant] = useState(0)
    const [nbrReparations, setNbrReparations] = useState(0)
    const [nbrConsommations, setNbrConsommations] = useState(0)

    const getDepenseByCarId = async (immatriculation: string) => {
        const depenses = await getDepensesByPeriod([immatriculation], THIS_MONTH)

        const typeReparation = types.find(type => type.libelle.toLowerCase().includes("Réparation".toLowerCase()))
        const typeConsommation = types.find(type => type.libelle.toLowerCase().includes("Consommation".toLowerCase()))
        
        setMontant(depenses.reduce((acc, dep) => acc + dep.montant, 0))
        setNbrReparations(depenses.filter(dep => dep.type_depense === typeReparation?._id).length)
        setNbrConsommations(depenses.filter(dep => dep.type_depense === typeConsommation?._id).length)
    }

    useEffect(() => {
        if (types.length) {
            getDepenseByCarId(car._id)
        }
    }, [types])

    return (
        <TouchableOpacity
            onPress={onPress}
            className="rounded-lg bg-gray-50 p-3 mb-3">
            <View className="h-40 w-full rounded-lg overflow-hidden">
                <Image
                    source={{ uri: car.images[0].url }}
                    className="h-full w-full"
                />
            </View>
           <View className="flex-row mt-2 space-x-1 justify-start items-center">
                <Text
                    className='text-sm'
                    style={{ fontFamily: FONTS.SemiBold, opacity: 0.8 }}>
                    {car.model.libelle} * {car.annee}
                </Text>
                <Text
                    className='text-sm'
                    style={{ fontFamily: FONTS.Regular, opacity: 0.8 }}>
                    * {car._id}
                </Text>
            </View>
             <Text
                className='text-xs mt-1'
                style={{ fontFamily: FONTS.SemiBold, color: COLORS.thirdth, opacity: 0.8 }}>
                {montant} Fcfa ce mois</Text>
            <View
                style={{ borderWidth: 0.8, borderColor: 'gray', opacity: 0.1 }}
                className="w-full border-gray-100 my-2"></View>
            <View className="flex-row justify-between">
                <Text
                    className='text-xs'
                    style={{ fontFamily: FONTS.Regular, opacity: 0.8 }}>{nbrReparations.toString().length < 2 ? `0${nbrReparations}`: nbrReparations} Réparations</Text>
                <Text
                    className='text-xs'
                    style={{ fontFamily: FONTS.Regular, opacity: 0.8 }}>{nbrConsommations.toString().length < 2 ? `0${nbrConsommations}`: nbrConsommations} Consommations</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CarCard
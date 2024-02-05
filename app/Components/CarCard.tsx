
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import { Car } from '../types'
import { FONTS } from '../Constants/Font'
import { COLORS } from '../Constants/Colors'

interface Props {
    onPress: () => void
    // car: Car
}

const CarCard: FC<Props> = ({ onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="rounded-lg bg-gray-50 p-3 mb-3">
            <View className="h-40 w-full rounded-lg overflow-hidden">
                <Image
                    source={require('../Assets/img/car3.jpg')}
                    className="h-full w-full"
                />
            </View>
            <Text
                className='text-sm mt-2'
                style={{ fontFamily: FONTS.SemiBold, opacity: 0.8 }}>
                Mercedes Benz 2020</Text>
            <Text
                className='text-xs'
                style={{ fontFamily: FONTS.SemiBold, color: COLORS.thirdth, opacity: 0.8 }}>
                75 000 Fcfa ce mois</Text>
            <View
                style={{ borderWidth: 0.8, borderColor: 'gray', opacity: 0.1 }}
                className="w-full border-gray-100 my-2"></View>
            <View className="flex-row justify-between">
                <Text
                    className='text-xs'
                    style={{ fontFamily: FONTS.Regular, opacity: 0.8 }}>02 Réparations</Text>
                <Text
                    className='text-xs'
                    style={{ fontFamily: FONTS.Regular, opacity: 0.8 }}>03 Chargements</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CarCard
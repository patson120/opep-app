

import React, { FC } from "react"
import { Text, TouchableOpacity, ActivityIndicator } from "react-native"
import { FONTS } from "../Constants/Font"
import { COLORS } from "../Constants/Colors"


type PropsType = {
    onPress: () => void,
    label: string,
    isLoading: boolean
}

const PrimaryButton: FC<PropsType> = ({ onPress, label, isLoading }) => {
    return (
        <TouchableOpacity
            style={{ backgroundColor: COLORS.secondary }}
            className='mt-8 h-12 justify-center items-center rounded-xl'
            onPress={onPress}
        >
            {isLoading ?
                <ActivityIndicator size="large" color={COLORS.white} /> :
                <Text
                    style={{ fontFamily: FONTS.Bold, color: COLORS.white }}
                    className='text-lg'
                >{label}</Text>
            }
        </TouchableOpacity>
    )
}

export default PrimaryButton
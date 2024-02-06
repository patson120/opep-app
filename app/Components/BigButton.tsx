import { View, Text, TouchableOpacity, Image, GestureResponderEvent } from 'react-native'
import React, { FC } from 'react'
import { FONTS } from '../Constants/Font'
import { COLORS } from '../Constants/Colors'
import * as Icon from 'react-native-feather'


type Props = {
    title: string;
    subTitle: string;
    children: React.JSX.Element,
    onPress: (event: GestureResponderEvent) => void;
}

const BigButton: FC<Props> = ({ title, subTitle, onPress, children }) => {
    return (
        <TouchableOpacity className="w-full -mt-2 mb-2 rounded-xl p-3 shadow-xl shadow-gray-400 bg-white"
            onPress={onPress}>
            <View className="flex-row justify-between items-center">
                <View className='w-1/5 h-14 rounded-lg bg-gray-100 justify-center items-center'>
                    { children}
                </View>
                <View className='w-3/5'>
                    <Text
                        className="text-sm"
                        style={{ fontFamily: FONTS.SemiBold, opacity: 0.8 }}>
                        {title}
                    </Text>
                    <Text
                        style={{ fontFamily: FONTS.Regular }}
                        className="text-left text-xs text-[#9D9D9D]">
                        {subTitle}
                    </Text>
                </View>
                <View className="-mr-1">
                    <Icon.ArrowRight color={COLORS.secondary} strokeWidth={2} width={30} height={30} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default BigButton
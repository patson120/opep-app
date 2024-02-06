import { FC } from "react";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native"

import * as Icon from 'react-native-feather'
import { FONTS } from "../Constants/Font";
import { COLORS } from "../Constants/Colors";

type Props = {
    title: string;
    subTitle: string;
    children: React.JSX.Element,
    onPress: (event: GestureResponderEvent) => void;
}

const DepenseGroup: FC<Props> = ({ title, subTitle, onPress, children }) => {
    return (
        <TouchableOpacity className="w-full pr-2"
            onPress={onPress}>
            <View className="flex-row justify-between items-center">
                <View className='w-1/5 h-14 rounded-lg bg-gray-100 justify-center items-center'>
                    {children}
                </View>
                <View className='w-3/5 space-y-1'>
                    <Text
                        className="text-sm"
                        style={{ fontFamily: FONTS.Regular }}>
                        {title}
                    </Text>
                    <Text
                        style={{ fontFamily: FONTS.Bold, color: COLORS.thirdth }}
                        className="text-left text-sm">
                        {subTitle}
                    </Text>
                </View>
                <View className="-mr-1">
                    <Icon.ArrowRight color={COLORS.secondary} strokeWidth={2} width={25} height={25} />
                </View>
            </View>
            <View
                style={{ borderWidth: 0.8, borderColor: 'gray', opacity: 0.1 }}
                className="w-full border-gray-100 my-4"></View>
        </TouchableOpacity>
    )
}

export default DepenseGroup
import { FC } from "react";
import { Text, View } from "react-native";
import { FONTS } from "../Constants/Font";




type DepenseProps = {
    label: string;
    value1: string;
    value2: string;
}

const DepenseItem: FC<DepenseProps> = ({ label, value1, value2 }) => {
    return (
        <View className="">
            <Text
                style={{ fontFamily: FONTS.SemiBold }}
                className="text-sm my-2">{label}</Text>

            <View className="flex-row justify-between">
                <Text
                    style={{ fontFamily: FONTS.Regular }}
                    className="text-xs">{value1}</Text>
                <Text
                    style={{ fontFamily: FONTS.SemiBold }}
                    className="text-xs">{value2}</Text>
            </View>
            <View
                style={{ borderWidth: 0.8, borderColor: 'gray', opacity: 0.15 }}
                className="w-full border-gray-100 my-3"></View>
        </View>
    )
}

export default DepenseItem
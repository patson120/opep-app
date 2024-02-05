import { FC } from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../Constants/Colors";
import { FONTS } from "../Constants/Font";

type CardProps = {
    onPress: (event: GestureResponderEvent) => void;
    label: string;
    value: string;
    children: any;
}

const CardTypeDepense: FC<CardProps> = ({ label, value, children, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ backgroundColor: COLORS.bgGray }}
            className="w-36 p-3 mr-3 rounded-md justify-center">
            {children}
            <Text
                style={{ fontFamily: FONTS.SemiBold }}
                className="text-sm my-2">{label}</Text>
            <Text
                style={{ fontFamily: FONTS.Regular, color: COLORS.thirdth }}
                className='text-sm'>{value}</Text>
        </TouchableOpacity>
    )
}

export default CardTypeDepense


import React, { FC } from "react"
import { Text, TextInput, View } from "react-native";
import { FONTS } from "../Constants/Font";


type PropsType = {
    label: string;
    placeholder: string;
    setData: (value: string) => void;
    data: string
}

const InputField: FC<PropsType> = ({ label, placeholder, setData, data }) => {
    return (
        <View className='mt-2'>
            <Text
            style= {{ fontFamily: FONTS.Regular }}
                className="text-left my-1 text-sm text-black"
            >
                {label}
            </Text>
            <TextInput
                style={{ fontFamily: FONTS.Regular }}
                className='border border-gray-300 rounded-xl h-12 pl-4 text-sm no-underline'
                placeholder={placeholder}
                underlineColorAndroid="transparent"
                onChangeText={setData}
                value={data}
                placeholderTextColor={'#9D9D9D'}
                multiline={true}
            />
        </View>
    )
}

export default InputField;
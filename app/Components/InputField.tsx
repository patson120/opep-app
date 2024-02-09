

import React, { FC, useState } from "react"
import { KeyboardTypeOptions, Text, TextInput, TouchableOpacity, View } from "react-native"
import { FONTS } from "../Constants/Font"
import * as Icon from 'react-native-feather'
import { COLORS } from "../Constants/Colors"


type PropsType = {
    label: string;
    placeholder: string;
    setData: (value: string) => void;
    data: string,
    showIcon: boolean,
    keyboardType: KeyboardTypeOptions | undefined
}

const InputField: FC<PropsType> = ({ label, placeholder, keyboardType, setData, data, showIcon }) => {
    const [show, setShow] = useState(true)
    return (
        <View className='mt-2'>
            <Text
                style={{ fontFamily: FONTS.Regular }}
                className="text-left my-1 text-sm text-black"
            >
                {label}
            </Text>
            <View className="flex-1 flex-row justify-center items-center border border-gray-300 rounded-xl h-12 pl-4 ">
                <TextInput
                    style={{ fontFamily: FONTS.Regular }}
                    className='flex-1 text-sm no-underline'
                    placeholder={placeholder}
                    underlineColorAndroid="transparent"
                    onChangeText={setData}
                    value={data}
                    placeholderTextColor={'#9D9D9D'}
                    secureTextEntry={show && showIcon}
                    keyboardType={keyboardType}
                // multiline={true} 
                />
                {showIcon &&
                    <TouchableOpacity className="mx-2" onPress={() => setShow(prev => !prev)}>
                        {show ? <Icon.Eye color={COLORS.gray} strokeWidth={2} width={20} height={20} /> :
                            <Icon.EyeOff color={COLORS.gray} strokeWidth={2} width={20} height={20} />}
                    </TouchableOpacity>}
            </View>
        </View>
    )
}

export default InputField;
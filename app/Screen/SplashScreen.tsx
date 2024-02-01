

import React from "react"
import { Image, View } from "react-native";
import { LOGO } from "../Constants";
import { COLORS } from "../Constants/Colors";



const SplashScreen = () => {
    return (
        <View
            style={{ backgroundColor: COLORS.primary}}
            className="flex-1 justify-center items-center"
        >
            <View>
                <Image
                    source={LOGO}
                    className="h-52 w-52"
                />
            </View>
        </View>
    )
}

export default SplashScreen;
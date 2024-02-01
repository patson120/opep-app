
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import React from "react"
import { COLORS } from "../Constants/Colors"
import Login from "../Screen/Login"
import { Text } from "react-native"
import Signup from "../Screen/Signup"

const Stack = createStackNavigator()

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: 'float',
                cardStyle: {
                    backgroundColor: COLORS.white,
                },
                headerBackgroundContainerStyle: {
                    backgroundColor: COLORS.white,
                },
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name="Login" component={Login}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="Signup" component={Signup}
                options={{
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    )
}

export default AuthStack
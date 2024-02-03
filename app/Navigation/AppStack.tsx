
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import React from "react"
import { COLORS } from "../Constants/Colors"
import Home from "../Screen/Home"

const Stack = createStackNavigator()

const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: 'float',
                cardStyle: {
                    backgroundColor: COLORS.black,
                },
                headerBackgroundContainerStyle: {
                    backgroundColor: COLORS.black,
                },
                ...TransitionPresets.SlideFromRightIOS,
            }}
            initialRouteName="Home"
        >
            <Stack.Screen name="Home" component={Home}
                options={{
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    )
}

export default AppStack

import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import React from "react"
import { COLORS } from "../Constants/Colors"
import VehiculeForm from "../Screen/forms/VehiculeForm"
import MainContainer from "./MainContainer"
import Login from "../Screen/Auth/Login"
import CarDetail from "../Screen/CarDetail"

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
            initialRouteName="BottomTabs">
            <Stack.Screen name="BottomTabs" component={MainContainer} options={{ headerShown: false }} />
            <Stack.Screen name="VehiculeForm" component={VehiculeForm} options={{ headerShown: false }} />
            <Stack.Screen name="CarDetail" component={CarDetail} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default AppStack
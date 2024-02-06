
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import React from "react"
import { COLORS } from "../Constants/Colors"
import CarDetail from "../Screen/CarDetail"
import DepenseForm from "../Screen/forms/DepenseForm"
import VehiculeForm from "../Screen/forms/VehiculeForm"
import MainContainer from "./MainContainer"

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
            <Stack.Screen name="DepenseForm" component={DepenseForm} options={{ headerShown: false }} />
            
        </Stack.Navigator>
    )
}

export default AppStack
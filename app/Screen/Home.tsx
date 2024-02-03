

import React from "react"

import { View, Text } from 'react-native'
import { COLORS } from "../Constants/Colors";
import VehiculeForm from "./forms/Add.vehicule";


const Home = () => {
    return (
        // <View
        //     className="flex-1"
        //     style={{ backgroundColor: COLORS.white }}>
        //     <Text>Home page</Text>
        // </View>
        <VehiculeForm />
    )
}

export default Home;
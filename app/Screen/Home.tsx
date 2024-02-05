

import React from "react"

import { View, Text, SafeAreaView, Image, FlatList } from 'react-native'
import { COLORS } from "../Constants/Colors"
import { StatusBar } from "expo-status-bar"

import { FONTS } from "../Constants/Font"
import Navigation from "../Service/Navigation"
import CarCard from "../Components/CarCard"
import BigButton from "../Components/BigButton"
import useCars from "../hooks/useCars"


const Home = () => {
    const { cars } = useCars()
    
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar style="dark" backgroundColor={COLORS.white} />

            <View className="flex-1 px-6 pt-5">
                <View className="w-24 pt-2">
                    <Image
                        source={require('../Assets/img/logo1 1.png')}
                        className="mb-5 w-auto"
                    />
                </View>
                <BigButton
                    title="Ajouter un véhicule"
                    subTitle="Suiver l’activité de votre véhicule dès maintenant"
                    onPress={() => { Navigation.navigate("VehiculeForm") }}
                />
                <Text
                    className='mt-2 text-lg'
                    style={{ fontFamily: FONTS.Bold, opacity: 0.8 }}>
                    Mes véhicules</Text>

                {/* Mes véhicules */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={({ _id }) => `${_id}`}
                    data={cars}
                    renderItem={({ item }) => <CarCard
                        car={item}
                        onPress={() => { }} />}
                />

            </View>
        </SafeAreaView >
    )
}

export default Home;




import React from "react"

import { View, Text, SafeAreaView, Platform, Image, TouchableOpacity } from 'react-native'
import { COLORS } from "../Constants/Colors"
import { StatusBar } from "expo-status-bar"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import * as Icon from "react-native-feather"
import { FONTS } from "../Constants/Font"
import Navigation from "../Service/Navigation"
import CarCard from "../Components/CarCard"
import BigButton from "../Components/BigButton"


const Home = () => {
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
                    title=""
                    subTitle="Suiver l’activité de votre véhicule dès maintenant"
                    onPress={() => { Navigation.navigate("VehiculeForm") }}
                />
                <View className="w-full -mt-2 mb-2 rounded-xl p-3 shadow-xl shadow-gray-400 bg-white">
                    {/* <TouchableOpacity
                        className="flex-row justify-between items-center"
                        >
                        <View className='w-1/5 h-14 rounded-lg bg-gray-100 justify-center items-center'>
                            <Image
                                className="h-auto w-10"
                                source={require("../Assets/icons/car.png")} />
                        </View>
                        <View className='w-3/5'>
                            <Text
                                className="text-sm"
                                style={{ fontFamily: FONTS.SemiBold, opacity: 0.8 }}>
                                Ajouter un véhicule</Text>
                            <Text
                                style={{ fontFamily: FONTS.Regular }}
                                className="text-left text-xs text-[#9D9D9D]">
                                Suiver l’activité de votre véhicule dès maintenant
                            </Text>
                        </View>
                        <View className="-mr-1">
                            <Icon.ArrowRight color={COLORS.secondary} strokeWidth={2} width={30} height={30} />
                        </View>
                    </TouchableOpacity> */}
                </View>
                <Text
                    className='mt-2 text-lg'
                    style={{ fontFamily: FONTS.Bold, opacity: 0.8 }}>
                    Mes véhicules</Text>

                {/* Mes véhicules */}
                <KeyboardAwareScrollView
                    className="flex-1 mt-2"
                    behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
                        <CarCard onPress={() => { }} />
                        <CarCard onPress={() => { }} />
                        <CarCard onPress={() => { }} />
                </KeyboardAwareScrollView>

            </View>
        </SafeAreaView >
    )
}

export default Home;


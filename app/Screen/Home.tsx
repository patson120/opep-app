

import React, { useEffect, useState } from "react"

import { View, Text, SafeAreaView, Image, FlatList, ActivityIndicator } from 'react-native'
import { COLORS } from "../Constants/Colors"
import { StatusBar } from "expo-status-bar"

import { FONTS } from "../Constants/Font"
import Navigation from "../Service/Navigation"
import CarCard from "../Components/CarCard"
import BigButton from "../Components/BigButton"
import useCars from "../hooks/useCars"
import * as Icon from 'react-native-feather'


const Home = () => {
    const { cars, refresh } = useCars()
    const [isLoading, setIsloading] = useState(false)

    const onRefresh = async () => {
        setIsloading(true)
        await refresh()
        setIsloading(false)
    }

    useEffect(() => {
        setIsloading(true)
        setTimeout(() => {
            setIsloading(false)
        }, 3000);
    }, [cars])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar style="dark" backgroundColor={COLORS.white} />
            <View className="flex-1 px-6 pt-5">
                <View className="w-24 pt-2">
                    <Image
                        source={require('../Assets/img/logo1 1.png')}
                        className="mb-5 w-auto" />
                </View>
                <BigButton
                    title="Ajouter un véhicule"
                    subTitle="Suiver l’activité de votre véhicule dès maintenant"
                    onPress={() => { Navigation.navigate("VehiculeForm") }}
                >
                    <Icon.Truck color={COLORS.gray} strokeWidth={2} width={30} height={30} />
                </BigButton>
                <Text
                    className='mt-2 text-lg'
                    style={{ fontFamily: FONTS.Bold, opacity: 0.8 }}>
                    Mes véhicules</Text>

                {/* Mes véhicules */}
                {
                    (cars.length == 0 && isLoading) &&
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color={COLORS.secondary} />
                    </View>
                }

                {
                   (cars.length > 0) && <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={({ _id }) => `${_id}`}
                        data={cars}
                        refreshing={isLoading}
                        onRefresh={onRefresh}
                        renderItem={({ item }) => <CarCard
                            car={item}
                            onPress={() => { Navigation.navigate("CarDetail", { car: item }) }} />}
                    />
                }

                {
                    (cars.length == 0 && !isLoading)  &&
                    <View className="flex-1 justify-center items-center h-52">
                        <Text
                            style={{ fontFamily: FONTS.Regular, color: COLORS.gray, opacity: 0.6 }}
                            className="text-sm">Aucun véhicule...</Text>
                    </View>
                }

            </View>
        </SafeAreaView >
    )
}

export default Home;


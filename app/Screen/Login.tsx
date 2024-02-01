

import React, { useState } from "react"

import {
    View,
    Text,
    Image,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity
}
    from 'react-native'
import { FONTS } from "../Constants/Font";
import InputField from "../Components/InputField";
import { COLORS } from "../Constants/Colors";
import Navigation from "../Service/Navigation";
import PrimaryButton from "../Components/PrimaryButton";

import { database } from '../config/firebase'
import { getDocs, query, where, collection } from "firebase/firestore";

import bcrypt from 'react-native-bcrypt'
import SimpleToast from 'react-native-simple-toast'
import { TABLE } from "../Constants/Table";
import { StatusBar } from "expo-status-bar";


const Login = () => {
    const [contact, setContact] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async () => {
        setIsLoading(true)
        const userQuery = query(collection(database, TABLE.USER), where("contact", "==", contact.trim()))
        const querySnapshot = await getDocs(userQuery);

        querySnapshot.forEach((doc) => {
            const user: User = doc.data() as User;
            bcrypt.compare(password, user.password, (err: Error, pass: boolean) => {
                if (!err) {
                    SimpleToast.show("Connecté avec succès", 3);
                    setContact('')
                    setPassword('')
                    setTimeout(() => {
                        Navigation.navigate("Home");
                    }, 1000);
                }
                else {
                    SimpleToast.show("Mot de passe incorrect", 3);
                }
                setIsLoading(false)
            })
        });
    }

    return (
        <SafeAreaView className="flex-1">
            {/* <StatusBar style="auto" /> */}
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
                <View
                    className="px-7 pt-12"
                >
                    <View
                        className="w-24 mb-4">
                        <Image
                            source={require('../Assets/img/logo1 1.png')}
                            className="mb-5 w-full"
                        />
                    </View>
                    <Text
                        style={{ fontFamily: FONTS.Bold }}
                        className='text-3xl'
                    >
                        Connexion</Text>
                    <Text
                        style={{ fontFamily: FONTS.Regular }}
                        className="text-left mt-1 mb-2 text-sm text-[#9D9D9D]"
                    >
                        Retrouver l’activité de vos véhicules dans un seul endroit
                    </Text>


                    <InputField
                        label={'Téléphone / Email'}
                        placeholder="00 - 000 - 000 - 000"
                        data={contact}
                        setData={setContact}
                    />
                    <InputField
                        label={'Mot de passe'}
                        placeholder="Entrez votre mot de passe"
                        data={password}
                        setData={setPassword}
                    />

                    <TouchableOpacity
                        className='mt-5'
                        onPress={() => {
                            console.log("Mot de passe oublié")
                        }}
                    >
                        <Text
                            style={{ fontFamily: FONTS.Regular }}
                            className="underline"
                        >Mot de passe oublié ?</Text>
                    </TouchableOpacity>


                    <PrimaryButton
                        onPress={handleSubmit}
                        label='Connexion'
                        isLoading={isLoading}
                    />

                    <View className='flex-row mt-5'>
                        <Text
                            style={{ fontFamily: FONTS.Regular }}
                            className="mr-1"
                        >Pas de compte ?</Text>
                        <TouchableOpacity
                            className=''
                            onPress={() => Navigation.navigate('Signup')}
                        >
                            <Text
                                style={{ fontFamily: FONTS.Bold, color: COLORS.thirdth }}
                                className=""
                            >S'inscrire</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Login;




import React, { useState } from "react"

import {
    View,
    Text,
    Image,
    SafeAreaView,
    Platform,
    TouchableOpacity,
    Alert
}
    from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FONTS } from "../../Constants/Font"
import InputField from "../../Components/InputField"
import { COLORS } from "../../Constants/Colors"
import Navigation from "../../Service/Navigation"
import PrimaryButton from "../../Components/PrimaryButton"
import { database } from '../../config/firebase'
import uuid from 'react-native-uuid'

import { doc, setDoc } from "firebase/firestore"
import { TABLE } from "../../Constants/Table"

import bcrypt from 'react-native-bcrypt'
import SimpleToast from 'react-native-simple-toast'
import { User } from "../../types"


const Signup = () => {

    const [contact, setContact] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const handleSubmit = () => {
        setIsLoading(true)

        const user: User = {
            _id: uuid.v4().toString(),
            name: name.trim(),
            contact: contact.trim(),
            password: password.trim(),
        };

        // Hash du mot de password
        bcrypt.hash(user.password, 10, async (err: Error, passwordHash: string | undefined) => {
            if (!err) {
                // Add a new document in collection USER
                await setDoc(doc(database, TABLE.USER, `${user._id}`), {
                    ...user,
                    password: passwordHash
                })

                SimpleToast.show('Compte créé avec succès', 3)
                setContact('')
                setPassword('')
                setName('')
                Navigation.navigate("Login")
            } else {
                Alert.alert(
                    "Erreur d'inscription",
                    "Une erreur est survenue lors de l'inscription. Veuillez vérifier vos information puis recommencer")
            }
            setIsLoading(false)
        })

    }

    return (
        <SafeAreaView className="flex-1">
            <KeyboardAwareScrollView
                className="flex-1"
                behavior={Platform.OS == 'ios' ? 'padding' : undefined}>

                <View
                    className="px-7 pt-12"
                >
                    <View
                        className="w-24 mb-4"
                    >
                        <Image
                            source={require('../../Assets/img/logo1 1.png')}
                            className="mb-5 w-full"
                        />

                    </View>
                    <Text
                        style={{ fontFamily: FONTS.Bold }}
                        className='text-3xl'
                    >
                        Inscription</Text>
                    <Text
                        style={{ fontFamily: FONTS.Regular }}
                        className="text-left mt-1 mb-2 text-sm text-[#9D9D9D]"
                    >
                        Retrouver l’activité de vos véhicules dans un seul endroit
                    </Text>

                    <InputField
                        label={'Nom'}
                        placeholder="Entrez votre nom"
                        data={name}
                        setData={setName}
                    />
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
                    <PrimaryButton
                        onPress={handleSubmit}
                        label="S'inscrire"
                        isLoading={isLoading}
                    />
                    <View className='flex-row mt-5'>
                        <Text
                            style={{ fontFamily: FONTS.Regular }}
                            className="mr-1"
                        >Avez-vous un compte ?</Text>
                        <TouchableOpacity
                            className=''
                            onPress={() => Navigation.navigate('Login')}
                        >
                            <Text
                                style={{ fontFamily: FONTS.Bold, color: COLORS.thirdth }}
                                className=""
                            >Connexion</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default Signup;
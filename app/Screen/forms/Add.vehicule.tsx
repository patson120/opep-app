

import { StatusBar } from "expo-status-bar"
import React, { FC, useCallback, useState } from "react"
import {
    Dimensions,
    Image,
    Platform,
    Text,
    TouchableOpacity,
    View
}
    from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { SafeAreaView } from "react-native-safe-area-context"
import { COLORS } from "../../Constants/Colors"

import * as Icon from "react-native-feather"
import { FONTS } from "../../Constants/Font"
import InputField from "../../Components/InputField"
import PrimaryButton from "../../Components/PrimaryButton"
import DropdownComponent from "../../Components/DropdownComponent"
import * as DocumentPicker from 'expo-document-picker'

import SimpleToast from 'react-native-simple-toast'
import { Car, FileDataType, GlobalUserState, Model, UserRootState } from "../../types"
import { uploadToFirebase } from "../../config/firebase"

const { width } = Dimensions.get('window')

import { database } from '../../config/firebase'
import uuid from 'react-native-uuid'

import { doc, setDoc } from "firebase/firestore"
import { TABLE } from "../../Constants/Table"
import { useSelector } from "react-redux"
import { selectUser } from "../../Redux/users"



const VehiculeForm: FC<any> = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [model, setModel] = useState<Model | null>()
    const [immatriculation, setImmatriculation] = useState<string>('')
    const [image, setImage] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string>('')

    const user = useSelector<GlobalUserState>(state => state.User)

    console.log('====================================');
    console.log(user);
    console.log('====================================');

    const [data, setData] = useState([
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ])

    const handleDocumentSelection = useCallback(async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
                multiple: true,
            });

            if (!result.canceled) {
                let fileData: FileDataType = result.assets[0] as FileDataType;
                setImage(fileData.uri)
                setFileName(fileData.name)
            }
        } catch (error: any) {
            SimpleToast.show(`Error Uploading file ${error.message}`, 3)
        }
    }, []);

    const handleSubmit = async () => {
        setIsLoading(true)
        const uploadResp = await uploadToFirebase(image, fileName, 'OpepMedia/images')
        console.log('====================================')
        console.log(uploadResp.downloadUrl,)
        console.log('====================================')

        const car: Car = {
            _id: immatriculation.trim(),
            model:  model!,
            image: uploadResp.downloadUrl,
            userId: password.trim(),
        };
        
        
         // Add a new document in collection USER
         await setDoc(doc(database, TABLE.USER, `${user._id}`), {
            ...user,
            password: passwordHash
        })

        setIsLoading(false)
    }


    return (
        <SafeAreaView
            style={{ backgroundColor: COLORS.white }}
            className="flex-1 ">
            <StatusBar style="light" />
            <KeyboardAwareScrollView
                className="flex-1 px-7"
                behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
                <View>
                    <Icon.ChevronLeft color={COLORS.black} strokeWidth={3} />
                </View>
                <View className="mt-10">
                    <Text
                        style={{ fontFamily: FONTS.Bold }}
                        className='text-lg'
                    >
                        Ajouter un véhicule</Text>
                    <Text
                        style={{ fontFamily: FONTS.Regular }}
                        className="text-left mt-1 mb-2 text-sm text-[#9D9D9D]"
                    >
                        Veuillez renseigner des informations sur tous les champs ci-dessous
                    </Text>
                </View>
                <DropdownComponent
                    label="Marque"
                    data={data}
                    onChangeValue={setModel}
                    placeholder="Entrer la marque..."
                />
                <InputField
                    label={'Modèle'}
                    placeholder="Ex: Classe C"
                    data={''}
                    setData={() => { }}
                />
                <InputField
                    label={'Immatriculation'}
                    placeholder="Ex: OU466GT"
                    data={immatriculation}
                    setData={setImmatriculation}
                />
                <Text
                    style={{ fontFamily: FONTS.Regular }}
                    className="text-left mt-4 text-base text-black">
                    Ajouter une photo
                </Text>
                {image ?
                    <View className="mt-2 w-full h-48 rounded-xl overflow-hidden relative">
                        <Image
                            className="h-full w-full"
                            source={{ uri: image }}
                        />
                        <TouchableOpacity
                            className="absolute top-2 right-2"
                            onPress={() => {setImage(null); setFileName('')}}
                        >
                            <Icon.XCircle color={"#930627"} strokeWidth={1} width={50} height={50} />
                        </TouchableOpacity>
                    </View>
                    : <TouchableOpacity
                        className='border border-gray-300 rounded-xl h-24 mt-2 p-3 pt-2 justify-center items-center'
                        onPress={handleDocumentSelection}>
                        <Icon.Image color={"#CACACA"} strokeWidth={1} width={50} height={50} />
                    </TouchableOpacity>
                }
                <View className="mt-10 mb-8 flex-row justify-between" >
                    <TouchableOpacity
                        style={{ width: width / 3 }}
                        className='border border-gray-300 rounded-xl h-12 p-2 justify-center items-center'
                        onPress={() => ''}>
                        <Text
                            style={{ fontFamily: FONTS.Regular }}
                            className="text-left text-base text-black">
                            Annuler
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{ width: width * (2 / 3) - 80 }}>
                        <PrimaryButton
                            isLoading={isLoading}
                            label="Valider"
                            onPress={handleSubmit}
                            marginTop={0}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default VehiculeForm

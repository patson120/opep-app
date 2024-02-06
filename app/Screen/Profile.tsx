

import { StatusBar } from 'expo-status-bar'
import React, { FC } from 'react'
import { Image, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { COLORS } from '../Constants/Colors'
import { FONTS } from '../Constants/Font'

import * as Icon from "react-native-feather"
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../Redux/users'
import Auth from '../Service/Auth'
import { GlobalUserState, User } from '../types'
import Navigation from '../Service/Navigation'

const Profile = () => {

  const dispatch = useDispatch()
  const user = useSelector<GlobalUserState>(state => state.User.user) as User;

  const logout = async () => {
    await Auth.logout()
    dispatch(logoutUser())
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar hidden />
      <KeyboardAwareScrollView
        className="flex-1 px-7 pt-12"
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}>

        <View className="flex-row space-x-2">
          <View className="w-24 h-24 rounded-full m-2 p-2 shadow-xl shadow-gray-400 bg-white">
            <View
              className="w-20 h-20 mb-4 rounded-full overflow-hidden shadow-xl shadow-gray-400">
              <Image
                source={require('../Assets/img/car3.jpg')}
                className="w-full h-full"
              />
            </View>
          </View>
          <View className="w-3/5 my-auto">
            <Text
              className='text-lg'
              style={{ fontFamily: FONTS.extraBold, opacity: 0.8 }}>
              {user.name} </Text>
            <TouchableOpacity
              className="mt-1"
              onPress={() => Navigation.navigate("DepenseForm")}>
              <Text
                className='text-xs'
                style={{ fontFamily: FONTS.Regular, opacity: 0.8 }}>
                Ajouter une dépense maintenant</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-6">
          <Item label='Paramètres' ><Icon.Settings color={COLORS.gray} strokeWidth={2} width={20} height={20} /></Item>
          <Item label='A propos de nous' ><Icon.HelpCircle color={COLORS.gray} strokeWidth={2} width={20} height={20} /></Item>
          <Item label='Theme' ><Icon.Sun color={COLORS.gray} strokeWidth={2} width={20} height={20} /></Item>
          <TouchableOpacity
            onPress={logout}>
            <Item label='Déconnexion' ><Icon.LogOut color={COLORS.gray} strokeWidth={2} width={20} height={20} /></Item>
          </TouchableOpacity>
          <Item label='Politique de confidentialité' ><Icon.BookOpen color={COLORS.gray} strokeWidth={2} width={20} height={20} /></Item>
          <Item label='Termes et conditions' ><Icon.Edit color={COLORS.gray} strokeWidth={2} width={20} height={20} /></Item>
        </View>


      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Profile



type Props = {
  children: any,
  label: string;

}

const Item: FC<Props> = ({ children, label }) => {
  return (
    <View>
      <View className="flex-row justify-start items-center">
        {children}
        <Text style={{ fontFamily: FONTS.Regular }} className="text-base ml-4">{label}</Text>
      </View>
      <View
        style={{ borderWidth: 0.8, borderColor: 'gray', opacity: 0.1 }}
        className="w-full border-gray-100 my-4"></View>
    </View>
  )
}


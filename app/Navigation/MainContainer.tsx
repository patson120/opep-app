


import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Icon from "react-native-feather"
import { COLORS } from '../Constants/Colors'
import Home from '../Screen/Home'
import Profile from '../Screen/Profile'
import VehiculeForm from '../Screen/forms/VehiculeForm'
import DepenseForm from '../Screen/forms/DepenseForm'




const Tab = createBottomTabNavigator()

const MainContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          let rn = route.name

          if (rn === "Home") {
            icon = <Icon.Home color={focused ? COLORS.secondary : COLORS.gray} strokeWidth={3} width={20} height={20} />
          }
          else if (rn === "DepenseForm") {
            icon = <Icon.TrendingDown color={focused ? COLORS.secondary : COLORS.gray} strokeWidth={3} width={20} height={20} />
          }
          else if (rn === 'Stats') {
            icon = <Icon.BarChart2 color={focused ? COLORS.secondary : COLORS.gray} strokeWidth={3} width={20} height={20} />
          }
          else if (rn === "Profile") {
            icon = <Icon.User color={focused ? COLORS.secondary : COLORS.gray} strokeWidth={3} width={20} height={20} />
          }
          return icon;
        }
      })}
    >

      <Tab.Screen name='Home' component={Home} options={{ headerShown: false}} />
      <Tab.Screen name='DepenseForm' component={DepenseForm} options={{ headerShown: false }} />
      <Tab.Screen name='Stats' component={VehiculeForm} options={{ headerShown: false }} />
      <Tab.Screen name='Profile' component={Profile} options={{ headerShown: false }} />


    </Tab.Navigator>
  )
}

export default MainContainer
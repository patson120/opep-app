import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import Navigation from "../Service/Navigation"
import { COLORS } from "../Constants/Colors"
import AuthStack from "./AuthStack"
import AppStack from "./AppStack"
import useFonts from "../Assets/hooks/useFonts"
import SplashScreen from "../Screen/SplashScreen"
import Auth from "../Service/Auth"
import { useDispatch, useSelector } from "react-redux"
import { GlobalUserState, User, UserRootState } from "../types"
import { setUser } from "../Redux/users"

const Stack = createStackNavigator();

const RootNavigator = () => {

    const dispatch = useDispatch()
    const login = useSelector<GlobalUserState>(state => state.User.login) as UserRootState;

    const [fontIsReady, setFontIsReady] = useState(false)
    const [loginChk, setLoginChk] = useState(true)

    useEffect(() => {
        const LoadFonts = async () => {
            try {
                await useFonts();
                // await Auth.setAccount(null)

                setTimeout(() => {
                    setFontIsReady(true)
                    setLoginChk(false) // juste pour passer le test qui plus bas
                }, 800);

            } catch (error) { }
        };
        LoadFonts();

    }, []);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        let data: User = await Auth.getAccount() as User;
        if (data != null) {
            dispatch(setUser(data))
            setLoginChk(false)
        } else {
            setLoginChk(false)
        }
    };

    if (loginChk || !fontIsReady) {
        return (<SplashScreen />)
    }

    return (
        <SafeAreaProvider>
            <NavigationContainer
                ref={r => Navigation.setTopLevelNavigator(r)}
            >
                <Stack.Navigator
                    detachInactiveScreens={false}
                    initialRouteName="Auth"
                    screenOptions={{
                        headerMode: 'float',
                        headerShown: false,
                        cardStyle: { backgroundColor: COLORS.white },
                        gestureEnabled: true,
                        headerBackgroundContainerStyle: {
                            backgroundColor: COLORS.black,
                        },
                        // gestureDirection: 'horizontal',
                        ...TransitionPresets.SlideFromRightIOS,
                    }}>

                    {!login ? (
                        <Stack.Screen name="Auth" component={AuthStack}
                            options={{
                                headerShown: false,
                            }}
                        />
                    ) : (
                        <Stack.Screen name="AppStack" component={AppStack}
                            options={{
                                headerShown: false,
                            }}
                        />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )

}

export default RootNavigator
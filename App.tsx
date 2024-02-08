

import { StatusBar } from "expo-status-bar"
import React from "react"
import { View } from "react-native"
import { Provider } from "react-redux"
import RootNavigator from "./app/Navigation/RootNavigator"
import { store } from "./app/Redux"


export default function App() {
    return (
        <Provider store={store}>
            <View className="flex-1 h-full">
                <StatusBar style='light' />
                <RootNavigator />
            </View>
        </Provider>
    )
}

// build apk
// eas build -p android --profile preview

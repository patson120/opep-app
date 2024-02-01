import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import RootNavigator from './app/Navigation/RootNavigator';

export default function App() {
  return (
    <View className="flex-1 h-full">
      <StatusBar style='light' />
      <RootNavigator />
    </View>
  )
}


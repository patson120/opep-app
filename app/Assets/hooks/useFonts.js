import * as Font from "expo-font";

const  useFonts = async () => {
   await Font.loadAsync({
      "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
      "Poppins-ExtraBold": require("../../../assets/fonts/Poppins-ExtraBold.ttf"),
      "Poppins-LightItalic": require("../../../assets/fonts/Poppins-LightItalic.ttf"),
      "Poppins-Medium": require("../../../assets/fonts/Poppins-Medium.ttf"),
      "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
    });
};

export default useFonts;
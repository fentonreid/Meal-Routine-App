import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { PropsWithChildren, useEffect } from "react";

const LoadFontProvider = (props: PropsWithChildren) => {
  const [loaded] = useFonts({
    Poppins_Light: require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    Poppins: require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    Poppins_Bold: require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    Poppins_SemiBold: require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),

    Vollkorn: require("../assets/fonts/Vollkorn/Vollkorn-Medium.ttf"),
    Vollkorn_Bold: require("../assets/fonts/Vollkorn/Vollkorn-Bold.ttf"),
    Vollkorn_ExtraBold: require("../assets/fonts/Vollkorn/Vollkorn-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return props.children;
};

export default LoadFontProvider;

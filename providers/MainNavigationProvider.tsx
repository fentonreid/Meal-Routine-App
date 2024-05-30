import { SettingsContext } from "@/store/SettingsContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import FontStyles from "@/constants/FontStyles";

const MainNavigationProvider = () => {
  const { getStartedEnabled, colours, colourTheme } =
    useContext(SettingsContext);
  const router = useRouter();

  useEffect(() => {
    if (!getStartedEnabled) router.replace("/(tabs)/mealroutine");
    else router.replace("/(getstarted)/1_welcome");
  }, [getStartedEnabled]);

  // Set navigation bottom bar -- setup in useEffect so I can await -- Unsure if this is valid/needed for IOS, targetting Android only for this snippet
  //   useEffect(() => {
  //     const changeBackgroundColour = async () => {
  //       if (Platform.OS === "android")
  //         NavigationBar.setBackgroundColorAsync(colours["background"]);
  //     };

  //     changeBackgroundColour();
  //   }, [colours]);

  // Custom styling override light and dark defaults for select properties: https://reactnavigation.org/docs/themes/
  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: colours["background"],
      card: colours["background"],
      text: colours["mainHeading"],
    },
  };

  const MyLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colours["background"],
      card: colours["background"],
      text: colours["mainHeading"],
    },
  };

  return (
    <>
      <ThemeProvider
        value={colourTheme === "dark" ? MyDarkTheme : MyLightTheme}
      >
        <StatusBar style={colourTheme === "dark" ? "light" : "dark"} />
        <Stack
          screenOptions={{
            headerTitleStyle: {
              ...FontStyles.mainHeading,
              color: colours["mainHeading"],
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(getstarted)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </>
  );
};

export default MainNavigationProvider;

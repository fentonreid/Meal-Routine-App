import SettingsContextProvider, {
  SettingsContext,
} from "@/store/SettingsContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import FontStyles from "@/constants/FontStyles";
import { AppProvider, UserProvider } from "@realm/react";
import RealmWrapper from "@/store/RealmWrapper";

// Keep the splashscreen showing until disabled after fonts are loaded
SplashScreen.preventAutoHideAsync();

// Setup notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function RootLayout() {
  return (
    <>
      <AppProvider id="application-0-zzrojcv">
        <UserProvider fallback={<RealmWrapper />}>
          <SettingsContextProvider>
            <ColourThemeWrapper />
          </SettingsContextProvider>
        </UserProvider>
      </AppProvider>
    </>
  );
}

const ColourThemeWrapper = () => {
  const { colours, colourTheme } = useContext(SettingsContext);

  // Set navigation bottom bar -- setup in useEffect so I can await
  // Todo: Unsure if this is valid/needed for IOS, targetting Android only for this snippet

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
        <MainNavigation />
      </ThemeProvider>
    </>
  );
};

const MainNavigation = () => {
  const router = useRouter();
  const { getStartedEnabled, colours, colourTheme } =
    useContext(SettingsContext);

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
    if (loaded) {
      if (!getStartedEnabled) {
        router.replace("/(tabs)/create");
      } else {
        router.replace("/(getstarted)/1_welcome");
      }

      SplashScreen.hideAsync();
    }
  }, [loaded, getStartedEnabled]);

  useEffect(() => {
    const changeBackgroundColour = async () => {
      if (Platform.OS === "android")
        NavigationBar.setBackgroundColorAsync(colours["background"]);
    };

    changeBackgroundColour();
  }, [colours]);

  if (!loaded) return null;

  return (
    <>
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
    </>
  );
};

import { COLOURS } from "@/constants/Colours";
import SettingsContextProvider, { SettingsContext } from "@/store/SettingsContext";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import * as Notifications from "expo-notifications";
import "@/src/i18n/config";
import { StatusBar } from "expo-status-bar";

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
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    Poppins_Bold: require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    Poppins_SemiBold: require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),

    Vollkorn: require("../assets/fonts/Vollkorn/Vollkorn-Medium.ttf"),
    Vollkorn_Bold: require("../assets/fonts/Vollkorn/Vollkorn-Bold.ttf"),
    Vollkorn_ExtraBold: require("../assets/fonts/Vollkorn/Vollkorn-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SettingsContextProvider>
      <ColourThemeWrapper />
    </SettingsContextProvider>
  );
}

const ColourThemeWrapper = () => {
  const { colourTheme } = useContext(SettingsContext);
  const colours = COLOURS[colourTheme];

  // Custom styling override light and dark defaults for select properties: https://reactnavigation.org/docs/themes/
  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: colours["background"],
      card: colours["background"],
      text: colours["mainHeading"],
      // border: string,
      // notification: string
    },
  };

  const MyLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colours["background"],
      card: colours["background"],
      text: colours["mainHeading"],
      // border: string,
      // notification: string
    },
  };

  return (
    <ThemeProvider value={colourTheme === "dark" ? MyDarkTheme : MyLightTheme}>
      <StatusBar style={colourTheme === "dark" ? "light" : "dark"} />
      <MainNavigation />
    </ThemeProvider>
  );
};

const MainNavigation = () => {
  const router = useRouter();

  const { getStartedEnabled } = useContext(SettingsContext);

  useEffect(() => {
    if (!getStartedEnabled) {
      router.replace("/(tabs)/settings");
    } else {
      router.replace("/(getstarted)/1_welcome");
    }
  }, [getStartedEnabled]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true, headerTitle: "Get Started" }} />
      <Stack.Screen name="(getstarted)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

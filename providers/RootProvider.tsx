import LoginScreen from "@/components/auth/AuthLoginAndSignup";
import SettingsContextProvider from "@/store/SettingsContext";
import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import * as Schema from "@/models/schemas/Schemas";
import { OpenRealmBehaviorType } from "realm";
import { SettingsContext } from "@/store/SettingsContext";
import NavigationBar from "expo-navigation-bar";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import FontStyles from "@/constants/FontStyles";
import LoadFontProvider from "@/providers/LoadFontsProviders";
import { Platform } from "react-native";
import Loading from "@/components/Loading";

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

const RootProvider = () => {
  const AppId = "application-0-zzrojcv";

  return (
    <>
      <SettingsContextProvider>
        <LoadFontProvider>
          <AppProvider id={AppId}>
            <UserProvider fallback={<LoginScreen />}>
              <RealmProvider
                schema={[
                  Schema.usersSchema,
                  Schema.users_diarySchema,
                  Schema.unitsSchema,
                  Schema.units_conversionFactorSchema,
                  Schema.shoppingCategoriesSchema,
                  Schema.reviewsSchema,
                  Schema.mealsSchema,
                  Schema.meals_ingredientsSchema,
                  Schema.mealRoutinesSchema,
                  Schema.mealRoutines_mealsSchema,
                  Schema.mealRoutines_shoppingListSchema,
                  Schema.ingredientsSchema,
                ]}
                sync={{
                  flexible: true,
                  newRealmFileBehavior: {
                    type: OpenRealmBehaviorType.DownloadBeforeOpen,
                  },
                  existingRealmFileBehavior: {
                    type: OpenRealmBehaviorType.DownloadBeforeOpen,
                  },
                  // Add initial subscriptions to sync a preferred
                  // subset of data to the device
                  initialSubscriptions: {
                    update: (mutableSubs, realm) => {
                      mutableSubs.add(realm.objects("users"));
                      mutableSubs.add(
                        realm
                          .objects("ingredients")
                          .filtered("isPublic == true")
                      );
                      mutableSubs.add(realm.objects("mealRoutines"));
                      mutableSubs.add(
                        realm.objects("meals").filtered("isPublic == true")
                      );
                      // mutableSubs.add(realm.objects("reviews"));
                      mutableSubs.add(
                        realm
                          .objects("shoppingCategories")
                          .filtered("isPublic == true")
                      );
                      mutableSubs.add(
                        realm.objects("units").filtered("isPublic == true")
                      );
                    },
                  },
                  onError: (session, error) => {
                    // Replace this with a preferred logger in production.
                    console.error("ERROR WITH REAL WRAPPER: ", error.message);
                  },
                }}
              >
                <MainNavigation />
              </RealmProvider>
            </UserProvider>
          </AppProvider>
        </LoadFontProvider>
      </SettingsContextProvider>
    </>
  );
};

const MainNavigation = () => {
  const router = useRouter();
  const { getStartedEnabled, colours, colourTheme } =
    useContext(SettingsContext);

  console.log("User is logged in, in main navigation now");

  useEffect(() => {
    if (!getStartedEnabled) router.replace("/(tabs)/create");
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

export default RootProvider;

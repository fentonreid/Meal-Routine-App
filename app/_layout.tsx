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
import { useContext, useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import FontStyles from "@/constants/FontStyles";
import {
  AppProvider,
  RealmProvider,
  UserProvider,
  useApp,
  useQuery,
  useUser,
} from "@realm/react";
import { MMKV } from "react-native-mmkv";
import { OpenRealmBehaviorType } from "realm";
import {
  usersSchema,
  unitsSchema,
  shoppingCategoriesSchema,
  reviewsSchema,
  mealsSchema,
  mealRoutinesSchema,
  ingredientsSchema,
  users_diarySchema,
  units_conversionFactorSchema,
  meals_ingredientsSchema,
  mealRoutines_shoppingListSchema,
  mealRoutines_mealsSchema,
  users,
} from "@/models/schemas/Schemas";
import Realm from "realm";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Alert,
  Button,
  Platform,
} from "react-native";
import { ObjectId } from "bson";

export const storage = new MMKV();

// Keep the splashscreen showing until disabled after fonts are loaded
//SplashScreen.preventAutoHideAsync();

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

const LoginScreen = () => {
  const realmApp = useApp();

  const [username, setUsername] = useState("test@test.com");
  const [password, setPassword] = useState("testing");

  const handleLogin = async () => {
    const credentials = Realm.Credentials.emailPassword(username, password);

    // Simple validation (for demonstration purposes)
    if (username === "" || password === "") {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    try {
      // Try sign in
      console.log("SIGN IN: ", username, password);
      const test = await realmApp.logIn(credentials);
      console.log("DID LOGIN WORK???", test.isLoggedIn);
    } catch (error) {
      // Try sign up
      // await realmApp.emailPasswordAuth.registerUser({
      //   email: username,
      //   password: password,
      // });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        textContentType="emailAddress"
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default function RootLayout() {
  return (
    <>
      <SettingsContextProvider>
        <AppProvider id="application-0-zzrojcv">
          <UserProvider fallback={<LoginScreen />}>
            <RealmProvider
              schema={[
                usersSchema,
                users_diarySchema,
                unitsSchema,
                units_conversionFactorSchema,
                shoppingCategoriesSchema,
                reviewsSchema,
                mealsSchema,
                meals_ingredientsSchema,
                mealRoutinesSchema,
                mealRoutines_mealsSchema,
                mealRoutines_shoppingListSchema,
                ingredientsSchema,
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
                      realm.objects("ingredients").filtered("isPublic == true")
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
              <ColourThemeWrapper />
            </RealmProvider>
          </UserProvider>
        </AppProvider>
      </SettingsContextProvider>
    </>
  );
}

const ColourThemeWrapper = () => {
  const { colours, colourTheme } = useContext(SettingsContext);

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

  //const user = useUser();

  console.log("MAIN NAVIGATION HIT...");
  //console.log(user);

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

  useEffect(() => {
    if (loaded) {
      if (!getStartedEnabled) router.replace("/(tabs)/create");
      else router.replace("/(getstarted)/1_welcome");

      //SplashScreen.hideAsync();
    }
  }, [loaded, getStartedEnabled]);

  // // Set navigation bottom bar -- setup in useEffect so I can await
  // // Todo: Unsure if this is valid/needed for IOS, targetting Android only for this snippet
  // useEffect(() => {
  //   const changeBackgroundColour = async () => {
  //     if (Platform.OS === "android")
  //       NavigationBar.setBackgroundColorAsync(colours["background"]);
  //   };

  //   changeBackgroundColour();
  // }, [colours]);

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

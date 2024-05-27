import { Stack } from "expo-router";
import { FontStyles } from "@/constants/FontStyles";
import { useContext } from "react";
import { SettingsContext } from "@/store/SettingsContext";

const MoreStackLayout = () => {
  const { colours } = useContext(SettingsContext);

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          ...FontStyles.mainHeading,
          color: colours["mainHeading"],
        },
        headerShadowVisible: false,
        headerTintColor: colours["accent"],
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Additional Features" }}
      />

      <Stack.Screen
        name="preferences/index"
        options={{ headerTitle: "User Preferences" }}
      />
      <Stack.Screen
        name="inner/privacy"
        options={{ headerTitle: "Privacy Policy" }}
      />
      <Stack.Screen name="inner/credits" options={{ headerTitle: "Credits" }} />

      <Stack.Screen
        name="manageuser/index"
        options={{ headerTitle: "Manage User Data" }}
      />
      <Stack.Screen
        name="manageuser/inner/usage"
        options={{ headerTitle: "Usage Statistics" }}
      />
      <Stack.Screen
        name="manageuser/inner/reset"
        options={{ headerTitle: "Reset Preferences" }}
      />
      <Stack.Screen
        name="manageuser/inner/delete"
        options={{ headerTitle: "Delete All Data" }}
      />
    </Stack>
  );
};

export default MoreStackLayout;

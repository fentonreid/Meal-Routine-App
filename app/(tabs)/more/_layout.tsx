import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { FontStyles } from "@/constants/FontStyles";
import { useContext } from "react";
import { SettingsContext } from "@/store/SettingsContext";

const MoreStackLayout = () => {
  const { colours } = useContext(SettingsContext);

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: { ...FontStyles.mainHeading, color: colours["mainHeading"] },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Additional Features" }} />
      <Stack.Screen name="settings/settings" options={{ headerTitle: "Settings" }} />
    </Stack>
  );
};

const styles = StyleSheet.create({});

export default MoreStackLayout;

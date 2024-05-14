import React, { useContext } from "react";
import { Stack } from "expo-router";
import { SettingsContext } from "@/store/SettingsContext";
import FontStyles from "@/constants/FontStyles";

const StackLayout = () => {
  const { colours } = useContext(SettingsContext);

  return (
    <Stack
      screenOptions={{
        headerTintColor: colours["accent"],
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerTitleStyle: { ...FontStyles.mainHeading, color: colours["mainHeading"] },
      }}
    >
      <Stack.Screen
        name="1_welcome"
        options={{
          headerTitle: "",
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="2_summary"
        options={{
          title: "Summary",
        }}
      />

      <Stack.Screen
        name="3_mealroutines"
        options={{
          title: "Meal Routines",
        }}
      />

      <Stack.Screen
        name="4_meals"
        options={{
          title: "Meals",
        }}
      />

      <Stack.Screen
        name="5_diary"
        options={{
          title: "Diary",
        }}
      />

      <Stack.Screen
        name="6_letsbegin"
        options={{
          headerTitle: "",
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
};

export default StackLayout;

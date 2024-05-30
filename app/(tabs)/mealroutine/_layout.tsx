import { Stack } from "expo-router";
import { FontStyles } from "@/constants/FontStyles";
import React, { useContext } from "react";
import { SettingsContext } from "@/store/SettingsContext";

const MealRoutineStack = () => {
  const { colours } = useContext(SettingsContext);

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          ...FontStyles.mainHeading,
          color: colours.mainHeading,
        },
        headerShadowVisible: false,
        headerShown: true,
        headerTintColor: colours.accent,
      }}
    >
      <Stack.Screen
        name="states/1_selecting_date_range"
        options={{ headerTitle: "Date Selection" }}
      />
      <Stack.Screen
        name="states/2_selecting_meals"
        options={{ headerTitle: "2 SELECTING MEALS" }}
      />
      <Stack.Screen
        name="states/3_shopping"
        options={{ headerTitle: "3 SHOPPING" }}
      />
      <Stack.Screen
        name="states/4_confirm_creation"
        options={{ headerTitle: "4 CONFIRM CREATION" }}
      />
      <Stack.Screen
        name="states/5_viewing"
        options={{ headerTitle: "5 VIEWING" }}
      />
      <Stack.Screen
        name="states/6_complete"
        options={{ headerTitle: "6 COMPLETE" }}
      />
    </Stack>
  );
};

export default MealRoutineStack;

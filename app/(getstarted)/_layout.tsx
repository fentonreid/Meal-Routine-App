import React, { useContext } from "react";
import { Stack } from "expo-router";
import { COLOURS } from "@/constants/Colours";
import { SettingsContext } from "@/store/SettingsContext";

const StackLayout = () => {
  const { colourTheme } = useContext(SettingsContext);
  const colours = COLOURS[colourTheme];

  return (
    <Stack
      screenOptions={{
        headerTintColor: colours["accent"],
        headerTitleStyle: { color: colours["mainHeading"] },
        headerTitleAlign: "center",
        headerShadowVisible: false,
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

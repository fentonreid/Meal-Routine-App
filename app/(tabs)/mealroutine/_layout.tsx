import { Stack } from "expo-router";
import { FontStyles } from "@/constants/FontStyles";
import React, { useContext, useEffect } from "react";
import { SettingsContext } from "@/store/SettingsContext";
import { MealRoutineState } from "@/models/enums/MealRoutineState";
import { router } from "expo-router";
import useMealRoutineState from "@/hooks/useMealRoutineState";

const MealRoutineStack = () => {
  const { colours } = useContext(SettingsContext);
  const mealRoutineState = useMealRoutineState();

  console.log("MEAL ROUTINE STATE IS: ", mealRoutineState);

  useEffect(() => {
    // SWITCH on mealRoutineState and redirect to appropriate stack
    switch (mealRoutineState) {
      case MealRoutineState.ACTIVE_MEAL_ROUTINE_NULL:
      case MealRoutineState.SELECTING_DATE_RANGE:
        router.replace("mealroutine/states/1_selecting_date_range");
        break;

      case MealRoutineState.SELECTING_MEALS:
        router.replace("mealroutine/states/2_selecting_meals");
        break;

      case MealRoutineState.SHOPPING:
        router.replace("mealroutine/states/3_shopping");
        break;

      case MealRoutineState.CONFIRM_CREATION:
        router.replace("mealroutine/states/4_confirm_creation");
        break;

      case MealRoutineState.VIEWING:
        router.replace("mealroutine/states/5_viewing");
        break;

      case MealRoutineState.COMPLETE:
        router.replace("mealroutine/states/6_complete");
        break;
    }
  }, []);

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
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="states/1_selecting_date_range"
        options={{ headerTitle: "1 SELECTING DATE RANGE" }}
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

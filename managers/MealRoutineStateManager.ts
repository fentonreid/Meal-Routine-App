import { MealRoutineState } from "@/models/enums/MealRoutineState";
import { Users } from "@/models/schemas/Schemas";
import { useQuery } from "@realm/react";
import { router } from "expo-router";
import { useEffect } from "react";

type Props = {
  ignoreCurrentMealRoutineState?: MealRoutineState[];
};

const MealRoutineStateManager = ({ ignoreCurrentMealRoutineState }: Props) => {
  const loggedInUser = useQuery<Users>("Users")[0];

  useEffect(() => {
    const mealRoutineState =
      loggedInUser.activeMealRoutineId === null
        ? MealRoutineState.ACTIVE_MEAL_ROUTINE_NULL
        : (loggedInUser.activeMealRoutineId!
            .mealRoutineState as MealRoutineState);

    // If we are already on the meal routine state then ignore...
    if (
      !ignoreCurrentMealRoutineState ||
      ignoreCurrentMealRoutineState!.includes(mealRoutineState) ||
      loggedInUser.activeMealRoutineId === null
    )
      return;

    // SWITCH on mealRoutineState and redirect to appropriate stack
    switch (mealRoutineState) {
      case MealRoutineState.ACTIVE_MEAL_ROUTINE_NULL:
      case MealRoutineState.SELECTING_DATE_RANGE:
        router.replace("mealroutine/states/1_selecting_date_range");
        break;

      case MealRoutineState.SELECTING_MEALS:
        router.replace("mealroutine/states/2_selecting_meals_day");
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
  }, [loggedInUser.activeMealRoutineId]);

  if (loggedInUser.activeMealRoutineId !== null)
    return loggedInUser.activeMealRoutineId;

  return null;
};

export default MealRoutineStateManager;

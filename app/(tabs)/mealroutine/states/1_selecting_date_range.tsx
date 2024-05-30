import Loading from "@/components/Loading";
import { MealRoutineState } from "@/models/enums/MealRoutineState";
import MealRoutineStateManager from "@/managers/MealRoutineStateManager";

const Screen = () => {
  console.log("IN 1");
  const activeMealRoutine = MealRoutineStateManager({
    ignoreCurrentMealRoutineState: [
      MealRoutineState.ACTIVE_MEAL_ROUTINE_NULL,
      MealRoutineState.SELECTING_DATE_RANGE,
    ],
  });

  console.log(activeMealRoutine);

  return <Loading />;
};

export default Screen;

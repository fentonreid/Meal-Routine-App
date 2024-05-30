import Loading from "@/components/Loading";
import MealRoutineStateManager from "@/managers/MealRoutineStateManager";
import { MealRoutineState } from "@/models/enums/MealRoutineState";

const Screen = () => {
  console.log("IN 2");
  MealRoutineStateManager({
    ignoreCurrentMealRoutineState: [MealRoutineState.SELECTING_MEALS],
  });

  return <Loading />;
};

export default Screen;

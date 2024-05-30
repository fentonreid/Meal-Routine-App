import Loading from "@/components/Loading";
import MealRoutineStateManager from "@/managers/MealRoutineStateManager";
import { MealRoutineState } from "@/models/enums/MealRoutineState";

const Screen = () => {
  console.log("IN 4");

  MealRoutineStateManager({
    ignoreCurrentMealRoutineState: [MealRoutineState.CONFIRM_CREATION],
  });
  return <Loading />;
};

export default Screen;

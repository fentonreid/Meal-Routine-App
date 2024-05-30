import Loading from "@/components/Loading";
import MealRoutineStateManager from "@/managers/MealRoutineStateManager";
import { MealRoutineState } from "@/models/enums/MealRoutineState";

const Screen = () => {
  console.log("IN 3");
  MealRoutineStateManager({
    ignoreCurrentMealRoutineState: [MealRoutineState.SHOPPING],
  });

  return <Loading />;
};

export default Screen;

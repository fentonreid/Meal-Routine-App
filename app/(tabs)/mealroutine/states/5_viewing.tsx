import Loading from "@/components/Loading";
import MealRoutineStateManager from "@/managers/MealRoutineStateManager";
import { MealRoutineState } from "@/models/enums/MealRoutineState";

const Screen = () => {
  console.log("IN 5");
  const activeMealRoutine = MealRoutineStateManager({
    ignoreCurrentMealRoutineState: [MealRoutineState.VIEWING],
  });

  console.log(activeMealRoutine);

  return <Loading />;
};

export default Screen;

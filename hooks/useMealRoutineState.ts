import { MealRoutineState } from "@/models/enums/MealRoutineState";
import { useQuery, useUser } from "@realm/react";
import { useEffect, useState } from "react";
import { ObjectId } from "bson";
import { MealRoutines, Users } from "@/models/schemas/Schemas";

const useMealRoutineState = () => {
  const user = useUser();
  const userMealRoutineProgress = useQuery<Users>("Users")[0];
  const [mealRoutineState, setMealRoutineState] = useState(
    MealRoutineState.ACTIVE_MEAL_ROUTINE_NULL
  );

  const activeMealRoutine = useQuery<MealRoutines>("MealRoutines").filtered(
    "creatorId == $0",
    new ObjectId(user.id)
  );

  useEffect(() => {
    if (activeMealRoutine && activeMealRoutine.length == 1) {
      setMealRoutineState(
        activeMealRoutine[0].mealRoutineState as MealRoutineState
      );
    }
  }, [activeMealRoutine]);

  return mealRoutineState;
};

export default useMealRoutineState;

import MealRoutineStateManager from "@/managers/MealRoutineStateManager";
import { MealRoutineState } from "@/models/enums/MealRoutineState";
import { View, Text } from "react-native";

const Screen = () => {
  console.log("IN 6");
  MealRoutineStateManager({
    ignoreCurrentMealRoutineState: [MealRoutineState.COMPLETE],
  });

  return (
    <View>
      <Text>WHAT ARE WE DOING?</Text>
    </View>
  );
};

export default Screen;

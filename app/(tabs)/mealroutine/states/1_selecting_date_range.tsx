import { MealRoutineState } from "@/models/enums/MealRoutineState";
import MealRoutineStateManager from "@/managers/MealRoutineStateManager";
import DatePickerCalendar from "@/components/DatePickerCalendar";
import { View } from "react-native";
import { Text_Text, Text_TextBold } from "@/components/TextStyles";
import { SettingsContext } from "@/store/SettingsContext";
import { useCallback, useContext, useState } from "react";
import Spacings from "@/constants/Spacings";
import { Button_PrimaryNormal } from "@/components/ButtonStyles";
import { useQuery, useRealm } from "@realm/react";
import { router } from "expo-router";
import { MomentToUTCDateEnd, MomentToUTCDateStart } from "@/constants/Date";
import {
  MealRoutine_Meals,
  MealRoutines,
  Users,
} from "@/models/schemas/Schemas";
import moment from "moment";
import { MealType } from "@/models/enums/MealType";
import { MealState } from "@/models/enums/MealState";
import { ObjectId } from "bson";

const Screen = () => {
  const { colours } = useContext(SettingsContext);
  const realm = useRealm();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const loggedInUser = useQuery<Users>("Users")[0];

  let activeMealRoutine = MealRoutineStateManager({
    ignoreCurrentMealRoutineState: [
      MealRoutineState.ACTIVE_MEAL_ROUTINE_NULL,
      MealRoutineState.SELECTING_DATE_RANGE,
    ],
  });

  // Method to create a new active meal routine
  const createMealRoutine = () =>
    realm.write(() => {
      console.log("USER?", loggedInUser);
      // Create meal routine
      const createdMealRoutine = realm.create<MealRoutines>("MealRoutines", {
        _id: new ObjectId(),
        creatorId: loggedInUser._id,
        mealRoutineState: MealRoutineState.ACTIVE_MEAL_ROUTINE_NULL,
      });

      // Create association between users and meal routines
      loggedInUser.activeMealRoutineId = createdMealRoutine._id;

      return createdMealRoutine;
    });

  const updateActiveMealRoutine = useCallback(
    (startDate: string, endDate: string) => {
      let meals: MealRoutine_Meals[] = [];

      if (activeMealRoutine == null) {
        // Meal Routine is null, so need to create an active meal routine reference from users to mealRoutines and populate the mealRoutine as expected
        console.log("ACTIVE MEAL ROUTINE IS NULL");
        activeMealRoutine = createMealRoutine();
        console.log("HERE??");
      }

      // Create a meals object loop through each day and create: breakfast, lunch, dinner and snack objects
      let currentDate = moment(startDate);
      const end = moment(endDate);

      while (currentDate.isSameOrBefore(end)) {
        // Create a meal for each meal type: breakfast, lunch, etc...
        for (let mealType in MealType) {
          meals.push({
            mealId: null,
            day: currentDate.format("dddd"),
            mealType: mealType,
            mealState: MealState.PENDING_MEAL_SELECTION,
          });
        }

        // Increment currentDate
        currentDate = currentDate.add(1, "days");
      }

      realm.write(() => {
        activeMealRoutine!.mealRoutineState = "CREATE_SELECTING_MEALS";
        activeMealRoutine!.startDate = MomentToUTCDateStart(startDate);
        activeMealRoutine!.endDate = MomentToUTCDateEnd(endDate);
        activeMealRoutine!.meals.push(...meals);
      });

      // Manually change to next route
      router.replace("mealroutine/states/2_selecting_meals");
    },
    [activeMealRoutine, realm]
  );

  const dateSelectionHandler = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  const confirmDateHandler = () => {
    if (startDate == "" || endDate == "") return;

    updateActiveMealRoutine(startDate, endDate);
  };

  return (
    <View
      style={{
        padding: Spacings.mainContainerViewPadding,
        marginVertical: 24,
        gap: 24,
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <Text_Text>
        Please select your end date for this meal routine. A maximum of{" "}
        <Text_TextBold style={{ color: colours.accent }}>10 days</Text_TextBold>{" "}
        from{" "}
        <Text_TextBold style={{ color: colours.accent }}>today</Text_TextBold>{" "}
        is allowed.
      </Text_Text>
      <DatePickerCalendar dateSelectedHandler={dateSelectionHandler} />
      <Button_PrimaryNormal
        disabled={startDate == "" || endDate == ""}
        onPress={confirmDateHandler}
      >
        Confirm Dates
      </Button_PrimaryNormal>
    </View>
  );
};

export default Screen;

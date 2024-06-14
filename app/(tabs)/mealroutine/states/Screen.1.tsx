import { Text_Text } from "@/components/TextStyles";
import MealRoutineStateManager from "@/managers/MealRoutineStateManager";
import { MealRoutineState } from "@/models/enums/MealRoutineState";
import { MealRoutine_ShoppingList } from "@/models/schemas/Schemas";
import { useRealm } from "@realm/react";
import { View } from "react-native";
import { ObjectId } from "bson";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useCallback, useContext, useRef, useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { SettingsContext } from "@/store/SettingsContext";
import { LoadingShoppingList, finishSnapPoints } from "./3_shopping";

export const Screen = () => {
  const { colours } = useContext(SettingsContext);
  const realm = useRealm();
  const [finished, setFinished] = useState(false);
  const finishBottomSheetRef = useRef<BottomSheet>(null);

  const activeMealRoutine = MealRoutineStateManager({
    ignoreCurrentMealRoutineState: [MealRoutineState.SHOPPING],
  });

  const createShoppingList = () => {
    // DEBUG: Onion, count 1
    const initialShoppingList: MealRoutine_ShoppingList[] = [
      {
        ingredientId: new ObjectId("664f4d68dbb68b376be92014"),
        isAdded: false,
        unitId: new ObjectId("664f928ddbb68b376be92092"),
        totalQuantity: 1,
      },
    ];

    setTimeout(() => {
      realm.write(() => {
        activeMealRoutine!.shoppingList = initialShoppingList;
      });
    }, 1000);
  };

  const deleteShoppingList = () => {
    realm.write(() => {
      realm.delete(activeMealRoutine!.shoppingList);
    });
  };

  const renderFinishBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={{ backgroundColor: colours.background }}
        {...props}
      ></BottomSheetBackdrop>
    ),
    [colours]
  );

  // If the shopping list has not been created then we display a loading screen and generate the shopping list
  if (
    !activeMealRoutine!.shoppingList ||
    activeMealRoutine!.shoppingList.length === 0
  ) {
    createShoppingList();
    return <LoadingShoppingList />;
  }

  const styles = StyleSheet.create({
    mealCategoryUnderline: {
      textDecorationLine: "line-through",
      textDecorationStyle: "solid",
    },

    bottomSheetContainer: {
      paddingHorizontal: 48,
      justifyContent: "space-evenly",
      flex: 1,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
    },

    segmentButtonActive: {
      paddingHorizontal: 14,
      paddingVertical: 4,
    },

    segmentButton: {
      paddingHorizontal: 14,
      paddingVertical: 4,
    },
  });

  return (
    <View>
      <Text_Text>SHOPPING LIST CREATED!</Text_Text>
      <TouchableOpacity onPress={deleteShoppingList}>
        <Text_Text>DELETE SHOPPING LIST</Text_Text>
      </TouchableOpacity>

      {finished && (
        <BottomSheet
          ref={finishBottomSheetRef}
          snapPoints={finishSnapPoints}
          enablePanDownToClose={true}
          index={finished ? 0 : -1}
          handleComponent={() => <></>}
          backdropComponent={renderFinishBackdrop}
          handleIndicatorStyle={{ backgroundColor: colours.background }}
          backgroundStyle={{ backgroundColor: colours.background }}
        >
          <BottomSheetView
            style={[
              styles.bottomSheetContainer,
              { backgroundColor: colours.background },
            ]}
          >
            <Button_Wide
              onPress={() => {
                realm.write(() => {
                  activeMealRoutine!.mealRoutineState =
                    MealRoutineState.SHOPPING;
                });

                router.replace("mealroutine/states/3_shopping");
              }}
            >
              Confirm Routine
            </Button_Wide>
            <Button_BackgroundThin onPress={handleFinishBottomSheetClose}>
              Make Amendments
            </Button_BackgroundThin>
          </BottomSheetView>
        </BottomSheet>
      )}
    </View>
  );
};

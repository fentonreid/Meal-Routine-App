import {
  Text_CardHeader,
  Text_TabIconText,
  Text_Text,
  Text_TextBold,
} from "@/components/TextStyles";
import Spacings from "@/constants/Spacings";
import MealRoutineStateManager from "@/managers/MealRoutineStateManager";
import { ThemeColours } from "@/models/ThemeColours";
import { MealRoutineState } from "@/models/enums/MealRoutineState";
import { MealState } from "@/models/enums/MealState";
import { MealType } from "@/models/enums/MealType";
import {
  DailyMeal_Meals,
  MealRoutine_DailyMeals,
  MealRoutines,
  Meals,
} from "@/models/schemas/Schemas";
import { SettingsContext } from "@/store/SettingsContext";
import { Stack, router } from "expo-router";
import moment from "moment";
import { CheckCircle, Lightning } from "phosphor-react-native";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
  Button_BackgroundThin,
  Button_PrimaryThin,
  Button_Wide,
} from "@/components/ButtonStyles";
import { useQuery, useRealm } from "@realm/react";

const createRoutineCustomHeaderLeft = (
  colours: ThemeColours,
  onPress: () => void,
  finished: boolean
) => {
  if (!finished) return <></>;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        gap: Spacings.mainContainerViewPaddingHalved,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <CheckCircle size={32} weight="fill" color={colours.accent} />
    </TouchableOpacity>
  );
};

const createRoutineCustomHeaderRight = (
  colours: ThemeColours,
  onPress: () => void
) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        gap: Spacings.mainContainerViewPaddingHalved,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Lightning size={24} weight="fill" color={colours.accent} />
    </TouchableOpacity>
  );
};

type MealTypeCount = {
  [mealType: string]: DailyMeal_Meals[];
};

interface RenderImageProps {
  imageURI?: string;
  avatarPlaceholderText?: string;
  disabled?: boolean;
  readyToBeAdded?: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

const Screen = () => {
  const { colours } = useContext(SettingsContext);
  const [finished, setFinished] = useState(false);
  const [quickAccessToggle, setQuickAccessToggle] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [filteredMealsByType, setFilteredMealsByType] = useState<Meals[]>([]);

  const realm = useRealm();
  const meals = useQuery<Meals>("Meals");

  const activeMealRoutine = MealRoutineStateManager({
    ignoreCurrentMealRoutineState: [MealRoutineState.SELECTING_MEALS],
  });

  const countMealsInState = (): number => {
    let count = 0;

    activeMealRoutine!.dailyMeals.forEach((dailyMeal) => {
      dailyMeal.meals.forEach((meal) => {
        if (meal.mealState === MealState.MEAL_READY_TO_BE_ADDED) {
          count++;
        }
      });
    });

    return count;
  };

  const quickAccessSelections = countMealsInState();

  const [selectedMeal, setSelectedMeal] = useState<Meals | null>(null);

  const handlePress = (meal: Meals) => {
    setSelectedMeal(meal === selectedMeal ? null : meal);
  };

  // Finish creating meal routine bottomSheet properties
  const finishSnapPoints = useMemo(() => ["35%"], []);
  const finishBottomSheetRef = useRef<BottomSheet>(null);

  const renderFinishBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={{ backgroundColor: colours.background }}
        {...props}
      ></BottomSheetBackdrop>
    ),
    []
  );

  const handleFinishBottomSheetClose = () =>
    finishBottomSheetRef?.current?.close();
  const handleFinishBottomSheetOpen = () =>
    finishBottomSheetRef?.current?.expand();

  // Create a useEffect that monitors the meal state and determines if the final modal should be shown
  useEffect(() => {
    let returnEarly = false;
    // Loop through all meals for each day, exclude snacks from being required
    for (var dailyMeal of activeMealRoutine!.dailyMeals) {
      for (var meals of dailyMeal!.meals) {
        // Skip if snack type
        if (
          MealType[meals.mealType as keyof typeof MealType] === MealType.SNACK
        )
          continue;

        if (meals.mealState !== MealState.PENDING_REVIEW) returnEarly = true;
      }
    }

    setFinished(!returnEarly);

    // Not ready to render the bottom sheet just yet
    if (returnEarly) return;

    // We are ready
    //    handleFinishBottomSheetOpen();
  }, [activeMealRoutine!.dailyMeals]);

  // Create a useEffect that monitors when the quick access meal type is changed by activeIndex, update the list of meals to render
  useEffect(() => {
    // Create a hacky mapping between indexes and categories
    const mapping: Record<number, string> = {
      0: "Breakfast",
      1: "Lunch",
      2: "Dinner",
      3: "Snacks",
    };
    let filteredMeals: Meals[] = [];
    for (var meal of meals) {
      if (meal.categories.includes(mapping[activeIndex]))
        filteredMeals.push(meal);
    }

    setFilteredMealsByType(filteredMeals);
  }, [activeIndex]);

  const renderMeal = ({ item }: { item: Meals }) => {
    return (
      <TouchableOpacity
        style={[
          {
            borderRadius: 8,
            backgroundColor: colours.light,
            width: 130,
            height: 130,
          },
          selectedMeal === item && {
            borderColor: colours.primaryButton,
            borderWidth: 8,
          },
        ]}
        onPress={() => {
          handlePress(item);
        }}
      >
        <Image
          style={[
            {
              flex: 1,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            },
            selectedMeal === item && {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            },
          ]}
          source={{ uri: item.imageURI }}
        />
        <Text_Text style={{ padding: 4 }}>{item.name}</Text_Text>
      </TouchableOpacity>
    );
  };

  const RenderImage = ({
    imageURI,
    avatarPlaceholderText,
    disabled,
    onPress,
    onLongPress,
    readyToBeAdded,
  }: RenderImageProps) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={100}
        style={[
          { borderRadius: 32 },
          readyToBeAdded && {
            borderStyle: "solid",
            borderWidth: 4,
            borderColor: colours.darkPrimary,
          },
        ]}
        disabled={disabled}
      >
        {imageURI ? (
          <Image
            style={[
              {
                width: 42,
                height: 42,
                borderRadius: 32,
              },
              readyToBeAdded && { opacity: 0.5 },
            ]}
            source={{ uri: imageURI }}
          />
        ) : (
          <View
            style={[
              {
                width: 42,
                height: 42,
                backgroundColor: "lightgray",
                borderRadius: 32,
                justifyContent: "center",
                alignItems: "center",
              },
              !disabled && {
                borderStyle: "dashed",
                borderWidth: 2,
                borderColor: colours.accent,
              },
              readyToBeAdded && {
                borderStyle: "solid",
                borderWidth: 0,
                borderColor: colours.darkPrimary,
              },
            ]}
          >
            <Text_TextBold>{avatarPlaceholderText}</Text_TextBold>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderMealAvatars = ({ item }: { item: DailyMeal_Meals }) => {
    // Skip if meal type is a snack, as we don't want to display the meal image for this
    if (MealType[item.mealType as keyof typeof MealType] === MealType.SNACK)
      return <></>;

    // Determine if meal is disabled or enabled
    const mapping: Record<number, string> = {
      0: "BREAKFAST",
      1: "LUNCH",
      2: "DINNER",
    };

    let disabled =
      selectedMeal === null ||
      mapping[activeIndex] !== item.mealType ||
      !quickAccessToggle;

    // If selected meal is null, we are in quick access mode and the meal has been added then we can allow button pressing for deletion
    if (
      selectedMeal === null &&
      quickAccessToggle &&
      item.mealState === MealState.PENDING_REVIEW
    )
      disabled = false;

    const addMealToPendingSelection = () => {
      if (selectedMeal === null) return;

      realm.write(() => {
        // If meal is being selected for the first time then overwrite
        item.mealId = selectedMeal;
        item.mealState = MealState.MEAL_READY_TO_BE_ADDED;
      });
    };

    const removeMealSelection = () => {
      realm.write(() => {
        item.mealId = undefined;
        item.mealState = MealState.PENDING_MEAL_SELECTION;
      });
    };

    // Return an empty image if the meal is yet to be selected or mealId is null
    if (
      MealState[item.mealState as keyof typeof MealState] ===
        MealState.PENDING_MEAL_SELECTION ||
      item.mealId === null ||
      !item.mealId!.imageURI
    )
      return (
        <RenderImage
          avatarPlaceholderText={item.mealType.charAt(0).toUpperCase()}
          disabled={disabled}
          onPress={addMealToPendingSelection}
          onLongPress={removeMealSelection}
          readyToBeAdded={item.mealState === MealState.MEAL_READY_TO_BE_ADDED}
        />
      );

    return (
      <RenderImage
        imageURI={item.mealId!.imageURI}
        disabled={disabled}
        onPress={addMealToPendingSelection}
        onLongPress={removeMealSelection}
        readyToBeAdded={item.mealState === MealState.MEAL_READY_TO_BE_ADDED}
      />
    );
  };

  const renderDailyItem = (
    { item }: { item: MealRoutine_DailyMeals },
    colours: ThemeColours
  ) => {
    let dateAsMoment = moment(item.date);

    // Get unique mealTypes in the current dailyMeal, this will be useful if more snacks are added
    const mealTypeCounts: MealTypeCount = {};

    for (var mealType in MealType) {
      // Get the number in daily meals
      let occurrences = item.meals.filter(
        (i) => i.mealType.toUpperCase() === mealType.toUpperCase()
      );

      mealTypeCounts[mealType] = occurrences;
    }

    // Determine if meal category requires underlining since it has been selected
    const underlineBreakfast =
      mealTypeCounts["BREAKFAST"].filter(
        (meal) => meal.mealState === MealState.PENDING_REVIEW
      ).length > 0;

    const underlineLunch =
      mealTypeCounts["LUNCH"].filter(
        (meal) => meal.mealState === MealState.PENDING_REVIEW
      ).length > 0;

    const underlineDinner =
      mealTypeCounts["DINNER"].filter(
        (meal) => meal.mealState === MealState.PENDING_REVIEW
      ).length > 0;

    return (
      <View
        style={{
          padding: 12,
          paddingRight: 8,
          borderRadius: 12,
          borderWidth: 0.5,
          marginHorizontal: 8,
          marginVertical: 6,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colours.light,
        }}
      >
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text_CardHeader>
              {item.day}, {dateAsMoment.format("Do")}
            </Text_CardHeader>
            {underlineBreakfast && underlineLunch && underlineBreakfast && (
              <CheckCircle
                size={32}
                color={colours.darkPrimary}
                weight="fill"
              />
            )}
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text_TabIconText
              style={[underlineBreakfast && styles.mealCategoryUnderline]}
            >
              Breakfast
            </Text_TabIconText>
            <Text_TabIconText>, </Text_TabIconText>
            <Text_TabIconText
              style={[underlineLunch && styles.mealCategoryUnderline]}
            >
              Lunch
            </Text_TabIconText>
            <Text_TabIconText>, </Text_TabIconText>
            <Text_TabIconText
              style={[underlineDinner && styles.mealCategoryUnderline]}
            >
              Dinner
            </Text_TabIconText>
          </View>
          <Text_TabIconText>
            {mealTypeCounts["SNACK"].length === 0
              ? ""
              : mealTypeCounts["SNACK"].length === 1
              ? "+ snack"
              : `+ snacks (${mealTypeCounts["SNACK"]})`}
          </Text_TabIconText>
        </View>
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end",
            gap: 4,
          }}
          horizontal
          data={item.meals}
          renderItem={renderMealAvatars}
          extraData={item.meals}
        />
      </View>
    );
  };

  const handleMealCategoryChange = (index: number) => {
    // Clear all selected indices since we have changed category
    setSelectedMeal(null);

    // Set new active index
    setActiveIndex(index);
  };

  const handleQuickAccessToggle = () => {
    setActiveIndex(0);
    setSelectedMeal(null);
    setQuickAccessToggle((prev) => !prev);

    realm.write(() => {
      activeMealRoutine!.dailyMeals.forEach((dailyMeal) =>
        dailyMeal.meals.forEach((meal) => {
          if (meal.mealState === MealState.MEAL_READY_TO_BE_ADDED)
            meal.mealState = MealState.PENDING_MEAL_SELECTION;
        })
      );
    });
  };

  const handleQuickAccessAdd = () => {
    setActiveIndex(0);
    setSelectedMeal(null);
    setQuickAccessToggle((prev) => !prev);

    realm.write(() => {
      activeMealRoutine!.dailyMeals.forEach((dailyMeal) =>
        dailyMeal.meals.forEach((meal) => {
          if (meal.mealState === MealState.MEAL_READY_TO_BE_ADDED)
            meal.mealState = MealState.PENDING_REVIEW;
        })
      );
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () =>
            createRoutineCustomHeaderLeft(
              colours,
              handleFinishBottomSheetOpen,
              finished
            ),
          headerRight: () =>
            createRoutineCustomHeaderRight(colours, handleQuickAccessToggle),
        }}
      />

      <View style={{ flex: 1 }}>
        {quickAccessToggle ? (
          <>
            <View
              style={{
                flex: 1 / 2,
                backgroundColor: colours.background,
                borderWidth: 0.5,
                borderColor: "lightgray",
                justifyContent: "space-around",
              }}
            >
              <View style={{ flex: 1, gap: 8 }}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: 12,
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <TouchableOpacity
                    key={0}
                    onPress={() => handleMealCategoryChange(0)}
                    style={
                      activeIndex === 0
                        ? [
                            styles.segmentButtonActive,
                            {
                              backgroundColor: colours.darkPrimary,
                              borderTopLeftRadius: 8,
                              borderBottomLeftRadius: 8,
                            },
                          ]
                        : [
                            styles.segmentButton,
                            {
                              backgroundColor: colours.secondary,
                              borderTopLeftRadius: 8,
                              borderBottomLeftRadius: 8,
                            },
                          ]
                    }
                  >
                    {activeIndex === 0 ? (
                      <Text_TextBold style={{ color: colours.buttonText }}>
                        Breakfast
                      </Text_TextBold>
                    ) : (
                      <Text_Text>Breakfast</Text_Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    key={1}
                    onPress={() => handleMealCategoryChange(1)}
                    style={
                      activeIndex === 1
                        ? [
                            styles.segmentButtonActive,
                            { backgroundColor: colours.darkPrimary },
                          ]
                        : [
                            styles.segmentButton,
                            { backgroundColor: colours.secondary },
                          ]
                    }
                  >
                    {activeIndex === 1 ? (
                      <Text_TextBold style={{ color: colours.buttonText }}>
                        Lunch
                      </Text_TextBold>
                    ) : (
                      <Text_Text>Lunch</Text_Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    key={2}
                    onPress={() => handleMealCategoryChange(2)}
                    style={
                      activeIndex === 2
                        ? [
                            styles.segmentButtonActive,
                            { backgroundColor: colours.darkPrimary },
                          ]
                        : [
                            styles.segmentButton,
                            { backgroundColor: colours.secondary },
                          ]
                    }
                  >
                    {activeIndex === 2 ? (
                      <Text_TextBold style={{ color: colours.buttonText }}>
                        Dinner
                      </Text_TextBold>
                    ) : (
                      <Text_Text>Dinner</Text_Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    key={3}
                    onPress={() => handleMealCategoryChange(3)}
                    style={
                      activeIndex === 3
                        ? [
                            styles.segmentButtonActive,
                            {
                              backgroundColor: colours.darkPrimary,
                              borderTopRightRadius: 8,
                              borderBottomRightRadius: 8,
                            },
                          ]
                        : [
                            styles.segmentButton,
                            {
                              backgroundColor: colours.secondary,
                              borderTopRightRadius: 8,
                              borderBottomRightRadius: 8,
                            },
                          ]
                    }
                  >
                    {activeIndex === 3 ? (
                      <Text_TextBold style={{ color: colours.buttonText }}>
                        Snacks
                      </Text_TextBold>
                    ) : (
                      <Text_Text>Snacks</Text_Text>
                    )}
                  </TouchableOpacity>
                </ScrollView>
                <FlatList
                  horizontal
                  data={filteredMealsByType}
                  contentContainerStyle={{
                    gap: 12,
                    paddingHorizontal: 12,
                  }}
                  renderItem={renderMeal}
                  keyExtractor={(item) => item._id.toString()}
                  extraData={meals}
                >
                  <Text>RENDER THE MEALS HERE</Text>
                </FlatList>
              </View>
            </View>

            <FlatList
              data={activeMealRoutine!.dailyMeals}
              renderItem={(item) => renderDailyItem(item, colours)}
              keyExtractor={(item) => item.date.toDateString()}
              style={{ flex: 1 / 2 }}
              extraData={activeMealRoutine!.dailyMeals}
            />
            <View
              style={{
                borderWidth: 0.5,
                borderColor: "lightgray",
                flex: 1 / 6,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 12,
                paddingHorizontal: 12,
              }}
            >
              <Button_BackgroundThin
                style={{ flex: 1 }}
                onPress={handleQuickAccessToggle}
              >
                Cancel
              </Button_BackgroundThin>
              {quickAccessSelections > 0 && (
                <Button_PrimaryThin
                  style={{ flex: 1 }}
                  onPress={handleQuickAccessAdd}
                >
                  Quick Add
                </Button_PrimaryThin>
              )}
            </View>
          </>
        ) : (
          <FlatList
            style={{ flex: 1 }}
            data={activeMealRoutine!.dailyMeals}
            renderItem={(item) => renderDailyItem(item, colours)}
            keyExtractor={(item) => item.date.toDateString()}
            extraData={activeMealRoutine!.dailyMeals}
          />
        )}
      </View>
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
                activeMealRoutine!.mealRoutineState = MealRoutineState.SHOPPING;
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
    </>
  );
};

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

export default Screen;

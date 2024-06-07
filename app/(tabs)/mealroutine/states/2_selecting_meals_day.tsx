import MealRoutineStateManager from "@/managers/MealRoutineStateManager";
import { MealRoutineState } from "@/models/enums/MealRoutineState";
import {
  DailyMeal_Meals,
  MealRoutine_DailyMeals,
  Meals,
} from "@/models/schemas/Schemas";
import { SettingsContext } from "@/store/SettingsContext";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  View,
  SectionList,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import { useQuery, useRealm } from "@realm/react";
import {
  CheckCircle,
  Heart,
  ListMagnifyingGlass,
  MagnifyingGlass,
  PlusCircle,
  Sliders,
  SlidersHorizontal,
  Star,
  StarHalf,
} from "phosphor-react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import Loading from "@/components/Loading";
import {
  Text_CardHeader,
  Text_ListText,
  Text_TabIconText,
  Text_Text,
  Text_TextBold,
} from "@/components/TextStyles";
import { MealState } from "@/models/enums/MealState";
import SwipeableRow from "@/components/SwipeableRow";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  Button_BackgroundThin,
  Button_PrimaryThin,
  Button_Wide,
} from "@/components/ButtonStyles";
import { MealType } from "@/models/enums/MealType";
import { SearchBar } from "react-native-screens";

const selectMealsSnapPoints = ["100%"];

// Determine if meal is disabled or enabled
const mapping: Record<number, string> = {
  0: "BREAKFAST",
  1: "LUNCH",
  2: "DINNER",
  3: "SNACK",
};

// Create a hacky mapping between indexes and categories
const mapping2: Record<number, string> = {
  0: "Breakfast",
  1: "Lunch",
  2: "Dinner",
  3: "Snacks",
};

const Screen = () => {
  const { colours } = useContext(SettingsContext);
  const navigation = useNavigation();
  const realm = useRealm();
  const [currentDayRoutine, setCurrentDayRoutine] =
    useState<MealRoutine_DailyMeals | null>(null);
  const [selectMealsToggle, setSelectMealsToggle] = useState<boolean>(true);
  const selectMealsBottomSheetRef = useRef<BottomSheet>(null);
  const meals = useQuery<Meals>("Meals");
  const [filteredMealsByType, setFilteredMealsByType] = useState<Meals[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListScrollRef = useRef<FlatList>(null);
  const [selectedMeals, setSelectedMeals] = useState<DailyMeal[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const activeMealRoutine = MealRoutineStateManager({
    ignoreCurrentMealRoutineState: [MealRoutineState.SELECTING_MEALS],
  });

  const headerRight = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.replace("mealroutine/states/2_selecting_meals_quick_access")
        }
      >
        <ListMagnifyingGlass
          size={48}
          weight="regular"
          color={colours.accentButton}
        />
      </TouchableOpacity>
    );
  };

  // Determine what day of the meal routine we are rendering here, this will inform the flatlist and header components
  const { dayIndex } = useLocalSearchParams();
  useEffect(() => {
    if (dayIndex) {
      setCurrentDayRoutine(
        activeMealRoutine!.dailyMeals[parseInt(dayIndex as string)]
      );
      return;
    }

    setCurrentDayRoutine(activeMealRoutine!.dailyMeals[0]);
  }, [dayIndex]);

  // Define required header
  useEffect(() => {
    navigation.setOptions({
      headerTitle: currentDayRoutine
        ? `${currentDayRoutine!.day}, ${moment(currentDayRoutine!.date).format(
            "Do"
          )}`
        : "",
      headerRight: !selectMealsToggle ? headerRight : () => <></>,
    });
  }, [navigation, currentDayRoutine, selectMealsToggle]);

  // Initial population of the filtered quick access meals
  useEffect(() => {
    setFilteredMealsByType(filterMealByCategoryIndex(activeIndex));
  }, []);

  const groupMealsByType = (meals: DailyMeal_Meals[]) => {
    const mealOrder = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];

    const groupedMeals: { [key: string]: DailyMeal_Meals[] } = meals.reduce(
      (acc: { [key: string]: DailyMeal_Meals[] }, meal) => {
        const { mealType } = meal;
        if (!acc[mealType]) {
          acc[mealType] = [];
        }
        acc[mealType].push(meal);
        return acc;
      },
      {}
    );

    return mealOrder.map((mealType) => ({
      title: mealType,
      data: groupedMeals[mealType] || [],
    }));
  };

  const handleSelectMealsBottomSheetClose = useCallback(() => {
    setSelectMealsToggle(false);
    setSelectedMeals([]);
    selectMealsBottomSheetRef?.current?.close();
  }, []);

  const handleSelectMealsBottomSheetOpen = useCallback(() => {
    setSelectMealsToggle(true);
    selectMealsBottomSheetRef?.current?.expand();
  }, []);

  const renderSectionHeader = ({
    section: { title, data },
  }: {
    section: {
      title: string;
      data: DailyMeal_Meals[];
    };
  }) => {
    const numberOfCompleteMeals = data.filter(
      (i) => i.mealState === MealState.PENDING_REVIEW
    );

    return (
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          backgroundColor: colours.light,
          paddingHorizontal: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text_CardHeader>{title}</Text_CardHeader>
            {numberOfCompleteMeals && numberOfCompleteMeals.length >= 1 && (
              <CheckCircle size={28} weight="fill" color={colours.primary} />
            )}
          </View>
        </View>
        <View
          style={{
            height: 2,
            backgroundColor: colours.secondary,
            marginTop: 6,
          }}
        ></View>
      </View>
    );
  };

  const RenderRating = ({ rating }: { rating: number }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        // Full star
        stars.push(
          <Star
            style={{ flex: 1 }}
            size={24}
            weight="fill"
            color={colours.accentButton}
          />
        );
      } else if (rating >= i - 0.5) {
        // Half star
        stars.push(
          <StarHalf
            style={{ flex: 1 }}
            size={24}
            weight="fill"
            color={colours.accentButton}
          />
        );
      } else {
        // Empty star
        stars.push(
          <Star
            style={{ flex: 1 }}
            size={24}
            weight="regular"
            color={colours.accent}
          />
        );
      }
    }

    return stars;
  };

  const RenderSingleMealItem = ({
    item,
    mealsOfSameType,
  }: {
    item: DailyMeal_Meals;
    mealsOfSameType: DailyMeal_Meals[];
  }) => {
    const heartFilled = true;
    const hasTasteRating = true;

    return (
      <SwipeableRow
        colours={colours}
        handleView={() => {}}
        handleDelete={() => {
          removeMealSelection(item, mealsOfSameType);
        }}
      >
        <View
          style={{
            flex: 1,
            marginVertical: 6,
            flexDirection: "row",
            backgroundColor: colours.background,
            borderRadius: 8,
            padding: 8,
            gap: 16,
          }}
        >
          <View style={{ flex: 3 }}>
            <View style={{ flex: 1, flexDirection: "row", gap: 4 }}>
              <Text_ListText style={{ flex: 3 }}>
                {item.mealId!.name}
              </Text_ListText>
              <Heart
                style={{ flex: 1 }}
                size={24}
                weight={heartFilled ? "fill" : "regular"}
                color={heartFilled ? colours.accentButton : colours.text}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
                marginLeft: 6,
              }}
            >
              <Text_TabIconText>Taste:</Text_TabIconText>
              {hasTasteRating ? (
                <RenderRating rating={4.5} />
              ) : (
                <Text_TabIconText style={{ color: colours.accent }}>
                  No rating
                </Text_TabIconText>
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
                marginLeft: 6,
              }}
            >
              <Text_TabIconText>Effort: </Text_TabIconText>
              {hasTasteRating ? (
                <RenderRating rating={3} />
              ) : (
                <Text_TabIconText style={{ color: colours.accent }}>
                  No rating
                </Text_TabIconText>
              )}
            </View>
          </View>

          <Image
            style={{
              flex: 1,
            }}
            resizeMode="contain"
            source={{ uri: item.mealId!.imageURI }}
          />
        </View>
      </SwipeableRow>
    );
  };

  const removeMealSelection = (
    item: DailyMeal_Meals,
    mealsOfSameType: DailyMeal_Meals[]
  ) => {
    realm.write(() => {
      const occurrences = mealsOfSameType.filter(
        (meal) => meal.mealType === item.mealType
      ).length;

      // If only one occurrence for this type was found then we can't remove from daily meals, just change state
      if (occurrences === 1) {
        item.mealId = undefined;
        item.mealState = MealState.PENDING_MEAL_SELECTION;
        return;
      }

      // Completely remove
      realm.delete(item);
    });
  };

  const renderDayRoutine = ({
    item,
    index,
    section,
  }: {
    item: DailyMeal_Meals;
    index: number;
    section: {
      title: string;
      data: DailyMeal_Meals[];
    };
  }) => {
    // If all meals in this section e.g. mealType are in pending_meal_selection mode then we ignore
    const noCompletedMealsForThisMealType = section.data.filter(
      (i) => i.mealState === MealState.PENDING_MEAL_SELECTION
    );

    return (
      <View
        style={[
          {
            backgroundColor: colours.light,
            paddingHorizontal: 12,
          },
          index === section.data.length - 1 && {
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          },
        ]}
      >
        {noCompletedMealsForThisMealType &&
        noCompletedMealsForThisMealType.length !== section.data.length ? (
          <RenderSingleMealItem item={item} mealsOfSameType={section.data} />
        ) : (
          <Text_Text style={{ marginTop: 6, textAlign: "center" }}>
            Nothing to show
          </Text_Text>
        )}
      </View>
    );
  };

  const filterMealByCategoryIndex = useCallback(
    (index: number) => {
      // Modify the existing stuff
      let filteredMeals: Meals[] = [];
      for (var meal of meals) {
        if (meal.categories.includes(mapping2[index])) filteredMeals.push(meal);
      }

      return filteredMeals;
    },
    [meals]
  );

  const RenderSectionFooter = ({
    section,
  }: {
    section: { title: string; data: DailyMeal_Meals[] };
  }) => {
    if (section.title === "SNACK") return null;

    return (
      <View
        style={{
          height: 24,
        }}
      />
    );
  };

  const handleMealCategoryChange = useCallback(
    (index: number) => {
      // Modify the existing stuff
      setFilteredMealsByType(filterMealByCategoryIndex(index));

      // // Clear all selected indices since we have changed category
      // setSelectedMeals([]);

      // Clear search text input
      setSearchText("");

      // Set new active index
      setActiveIndex(index);

      // Reset scroll between category switching
      flatListScrollRef.current?.scrollToOffset({ offset: 0 });
    },
    [meals]
  );

  const RenderMealCategoryScrollView = () => (
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
        delayPressIn={0}
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
        delayPressIn={0}
        style={
          activeIndex === 1
            ? [
                styles.segmentButtonActive,
                { backgroundColor: colours.darkPrimary },
              ]
            : [styles.segmentButton, { backgroundColor: colours.secondary }]
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
        delayPressIn={0}
        style={
          activeIndex === 2
            ? [
                styles.segmentButtonActive,
                { backgroundColor: colours.darkPrimary },
              ]
            : [styles.segmentButton, { backgroundColor: colours.secondary }]
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
        delayPressIn={0}
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
  );

  interface DailyMeal {
    meal: Meals;
    mealType: string;
  }

  const handleMealPress = useCallback((dailyMeal: DailyMeal) => {
    setSelectedMeals((prevSelectedMeals) => {
      const isSelected = prevSelectedMeals.find(
        (meal) =>
          meal.meal._id.toString() === dailyMeal.meal._id.toString() &&
          meal.mealType === dailyMeal.mealType
      );

      return isSelected
        ? prevSelectedMeals.filter(
            (meal) =>
              !(
                meal.meal._id.toString() === dailyMeal.meal._id.toString() &&
                meal.mealType === dailyMeal.mealType
              )
          )
        : [...prevSelectedMeals, dailyMeal];
    });
  }, []);

  const RenderSingleMealFlatList = ({ item }: { item: Meals }) => {
    const heartFilled = true;
    const hasTasteRating = true;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          handleMealPress({ meal: item, mealType: mapping[activeIndex] });
        }}
        style={[
          {
            flex: 1,
            flexDirection: "row",
            backgroundColor: colours.background,
            borderRadius: 8,
            padding: 8,
            gap: 16,
          },
          selectedMeals.find(
            (i) =>
              i.meal._id.toString() === item._id.toString() &&
              i.mealType === mapping[activeIndex]
          ) && {
            borderWidth: 6,
            borderColor: colours.darkPrimary,
          },
        ]}
      >
        <View style={{ flex: 3 }}>
          <View style={{ flex: 1, flexDirection: "row", gap: 4 }}>
            <Text_ListText style={{ flex: 3 }}>{item.name}</Text_ListText>
            <Heart
              style={{ flex: 1 }}
              size={24}
              weight={heartFilled ? "fill" : "regular"}
              color={heartFilled ? colours.accentButton : colours.text}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 4,
              alignItems: "center",
              marginLeft: 6,
            }}
          >
            <Text_TabIconText>Taste:</Text_TabIconText>
            {hasTasteRating ? (
              <RenderRating rating={4.5} />
            ) : (
              <Text_TabIconText style={{ color: colours.accent }}>
                No rating
              </Text_TabIconText>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 4,
              alignItems: "center",
              marginLeft: 6,
            }}
          >
            <Text_TabIconText>Effort: </Text_TabIconText>
            {hasTasteRating ? (
              <RenderRating rating={3} />
            ) : (
              <Text_TabIconText style={{ color: colours.accent }}>
                No rating
              </Text_TabIconText>
            )}
          </View>
        </View>

        <Image
          style={{
            flex: 1,
          }}
          resizeMode="contain"
          source={{ uri: item.imageURI }}
        />
      </TouchableOpacity>
    );
  };

  const onSearchTextChange = (inputText: string) => {
    setSearchText(inputText);

    if (inputText === "") {
      setFilteredMealsByType(filterMealByCategoryIndex(activeIndex));
      return;
    }

    const filteredList = filterMealByCategoryIndex(activeIndex).filter((meal) =>
      meal.name?.toLowerCase().includes(inputText.toLowerCase())
    );

    // Filter meals by type based on name
    setFilteredMealsByType(filteredList);
  };

  const addMeals = () => {
    // Take the selected meals list and add
    // Loop through each meal add modify the type

    realm.write(() => {
      // For each selected meal
      for (var selectedMeal of selectedMeals) {
        let foundMeal = currentDayRoutine!.meals.find(
          (meal) =>
            meal.mealState === MealState.PENDING_MEAL_SELECTION &&
            meal.mealType === selectedMeal.mealType
        );

        if (foundMeal) {
          foundMeal.mealState = MealState.PENDING_REVIEW;
          foundMeal.mealId = selectedMeal.meal;
          continue;
        }

        // If not then create a new mealState
        currentDayRoutine?.meals.push({
          mealId: selectedMeal.meal,
          mealState: MealState.PENDING_REVIEW,
          mealType: selectedMeal.mealType,
        });
      }
    });

    handleSelectMealsBottomSheetClose();
  };

  const RenderSelectMealsBottomSheet = () => {
    return (
      <BottomSheetView
        style={{
          backgroundColor: colours.background,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1, gap: 12 }}>
          <View style={{ marginTop: 6 }}>
            <RenderMealCategoryScrollView />
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 12,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                padding: 2,
                borderRadius: 12,
                backgroundColor: colours.secondary,
                flex: 1,
              }}
            >
              <MagnifyingGlass
                style={{ marginLeft: 6 }}
                size={18}
                color={colours.mainHeading}
              />
              <TextInput
                style={{ flex: 1 }}
                placeholder="Search"
                onChangeText={onSearchTextChange}
                value={searchText}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                console.log("FILTER...");
              }}
              style={{ marginLeft: 6 }}
            >
              <Sliders
                size={32}
                color={colours.accent}
                style={{ transform: [{ rotate: "90deg" }] }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: colours.secondary,
              marginBottom: 12,
              marginHorizontal: 12,
              borderRadius: 6,
              paddingBottom: 6,
            }}
          >
            <FlatList
              ListHeaderComponent={<SearchBar />}
              ref={flatListScrollRef}
              data={filteredMealsByType}
              extraData={[meals, filteredMealsByType]}
              contentContainerStyle={{
                gap: 6,
                paddingHorizontal: 6,
              }}
              renderItem={RenderSingleMealFlatList}
              keyExtractor={(item) => item._id.toString()}
            />
          </View>
        </View>

        <View
          style={{
            borderTopWidth: 0.5,
            borderColor: "lightgray",
            flex: 1 / 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            paddingHorizontal: 12,
          }}
        >
          <Button_BackgroundThin
            style={{
              flex: 1,
            }}
            onPress={handleSelectMealsBottomSheetClose}
          >
            Cancel
          </Button_BackgroundThin>
          {selectMealsToggle && selectedMeals.length > 0 && (
            <Button_PrimaryThin
              style={{
                flex: 2,
                borderWidth: 1,
                borderColor: colours.darkPrimary,
              }}
              onPress={addMeals}
            >
              {selectMealsToggle && selectedMeals.length > 1
                ? `Add Meals (${selectedMeals.length})`
                : "Add Meal"}
            </Button_PrimaryThin>
          )}
        </View>
      </BottomSheetView>
    );
  };

  if (!currentDayRoutine) return <Loading />;

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View style={{ flex: 1, gap: 24 }}>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 12,
              gap: 4,
              marginTop: 12,
            }}
          >
            {activeMealRoutine!.dailyMeals.map((item) => (
              <TouchableOpacity
                key={item.date.toDateString()}
                onPress={() => {
                  setCurrentDayRoutine(item);
                }}
                style={{
                  paddingHorizontal: 6,
                  backgroundColor:
                    item.date.toDateString() !==
                    currentDayRoutine!.date.toDateString()
                      ? "lightgray"
                      : colours.accentButton,
                  borderRadius: 60,
                }}
              >
                <Text_TextBold
                  style={[
                    item === currentDayRoutine && {
                      color: colours.light,
                    },
                  ]}
                >
                  {moment(item.date).format("Do")}
                </Text_TextBold>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <SectionList
            showsVerticalScrollIndicator={false}
            sections={groupMealsByType(currentDayRoutine!.meals)}
            renderItem={renderDayRoutine}
            renderSectionHeader={renderSectionHeader}
            extraData={currentDayRoutine!.meals}
            renderSectionFooter={RenderSectionFooter}
            contentContainerStyle={{
              paddingHorizontal: 12,
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSelectMealsBottomSheetOpen}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PlusCircle size={72} weight="fill" color={colours.accentButton} />
      </TouchableOpacity>

      <BottomSheet
        ref={selectMealsBottomSheetRef}
        snapPoints={selectMealsSnapPoints}
        index={selectMealsToggle ? 0 : -1}
        enableContentPanningGesture={false}
        handleComponent={() => <></>}
        handleIndicatorStyle={{ backgroundColor: colours.background }}
        backgroundStyle={{ backgroundColor: colours.background }}
      >
        <RenderSelectMealsBottomSheet />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
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

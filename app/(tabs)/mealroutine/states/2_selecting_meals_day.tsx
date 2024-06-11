import { RangeSlider } from "@react-native-assets/slider";
import MealRoutineStateManager from "@/managers/MealRoutineStateManager";
import { MealRoutineState } from "@/models/enums/MealRoutineState";
import {
  DailyMeal_Meals,
  MealRoutine_DailyMeals,
  Meals,
  Reviews,
  Users,
} from "@/models/schemas/Schemas";
import { SettingsContext } from "@/store/SettingsContext";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
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
  Star,
  StarHalf,
  XCircle,
} from "phosphor-react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import Loading from "@/components/Loading";
import {
  Text_CardHeader,
  Text_ListText,
  Text_MainHeading,
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
} from "@/components/ButtonStyles";
import { SearchBar } from "react-native-screens";
import { ThemeColours } from "@/models/ThemeColours";
import React from "react";

const selectMealsSnapPoints = ["100%"];
const filterMealsSnapPoints = ["100%"];

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

enum SortFilter {
  TASTE,
  EFFORT,
}

enum FilterFilter {
  ADDEDBYYOU,
  MAKEAGAIN,
  TASTE,
  EFFORT,
}

const RenderRating = ({
  rating,
  colours,
}: {
  rating: number;
  colours: ThemeColours;
}) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // Full star
      stars.push(
        <Star
          key={i}
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
          key={i}
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
          key={i}
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

const mealOrder = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];

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

interface DailyMeal {
  meal: Meals;
  mealType: string;
}

const Screen = () => {
  const { colours } = useContext(SettingsContext);
  const navigation = useNavigation();
  const realm = useRealm();
  const [currentDayRoutine, setCurrentDayRoutine] =
    useState<MealRoutine_DailyMeals | null>(null);
  const [selectMealsToggle, setSelectMealsToggle] = useState<boolean>(true);
  const [filterMealsToggle, setFilterMealsToggle] = useState<boolean>(false);
  const filterMealsBottomSheetRef = useRef<BottomSheet>(null);
  const selectMealsBottomSheetRef = useRef<BottomSheet>(null);
  const meals = useQuery<Meals>("Meals");
  const [filteredMeals, setFilteredMeals] = useState<Meals[]>(
    Array.from(meals) as Meals[]
  );
  const [tasteRange, setTasteRange] = useState<[number, number]>([0, 5]);
  const [effortRange, setEffortRange] = useState<[number, number]>([0, 5]);
  const [filteredMealsByType, setFilteredMealsByType] = useState<Meals[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListScrollRef = useRef<FlatList>(null);
  const [selectedMeals, setSelectedMeals] = useState<DailyMeal[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [sortFilters, setSortFilters] = useState<SortFilter[]>([]);
  const [filterFilters, setFilterFilters] = useState<FilterFilter[]>([]);
  const [tasteCount, setTasteCount] = useState(0);
  const [effortCount, setEffortCount] = useState(0);

  const user = useQuery<Users>("Users")[0];
  const reviews = useQuery<Reviews>("Reviews").sorted([["creationDate", true]]);
  const uniqueReviewsMap = useMemo(() => {
    const temp = new Map();
    reviews.forEach((review) => {
      temp.set(review.mealId.toString(), review);
    });

    return temp;
  }, [reviews]);

  const activeMealRoutine = MealRoutineStateManager({
    ignoreCurrentMealRoutineState: [MealRoutineState.SELECTING_MEALS],
  });

  const headerRight = useCallback(() => {
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
  }, [colours, router]);

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
  useLayoutEffect(() => {
    if (!filterMealsToggle) {
      navigation.setOptions({
        headerTitle: currentDayRoutine
          ? `${currentDayRoutine!.day}, ${moment(
              currentDayRoutine!.date
            ).format("Do")}`
          : "",
        headerLeft: () => <></>,
        headerRight: !selectMealsToggle ? headerRight : () => <></>,
      });
      return;
    }

    // Handle when it does filter
    navigation.setOptions({
      headerTitle: "Sort & Filter",
      headerLeft: () => <CustomHeaderLeftForFilter />,
      headerRight: () => <CustomHeaderRightForFilter />,
    });
  }, [navigation, currentDayRoutine, selectMealsToggle, filterMealsToggle]);

  // Initial population of the filtered quick access meals
  useEffect(() => {
    setFilteredMealsByType(filterMealByCategoryIndex(activeIndex));
  }, []);

  const CustomHeaderLeftForFilter = useCallback(() => {
    return (
      <TouchableOpacity
        style={{ paddingTop: 8 }}
        onPress={useCallback(() => {
          resetFilters();
          handleSelectMealsBottomSheetOpen();
          handleFilterMealsBottomSheetClose();
        }, [])}
      >
        <Text_TextBold style={{ color: colours.accentButton }}>
          Cancel
        </Text_TextBold>
      </TouchableOpacity>
    );
  }, [colours, filterMealsToggle]);

  const resetFilters = useCallback(() => {
    setSortFilters([]);
    setFilterFilters([]);
    setTasteRange([0, 5]);
    setEffortRange([0, 5]);
  }, []);

  const CustomHeaderRightForFilter = useCallback(() => {
    return (
      <TouchableOpacity style={{ paddingTop: 8 }} onPress={resetFilters}>
        <Text_Text>Reset</Text_Text>
      </TouchableOpacity>
    );
  }, []);

  const groupMealsByType = useCallback((meals: DailyMeal_Meals[]) => {
    // Group meals by mealType
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

    Object.keys(groupedMeals).forEach((mealType) => {
      groupedMeals[mealType].sort((a, b) => {
        const nameA = a.mealId?.name || "";
        const nameB = b.mealId?.name || "";
        return nameA.localeCompare(nameB);
      });
    });

    // Return the sorted and grouped meals in the desired order
    return mealOrder.map((mealType) => ({
      title: mealType,
      data: groupedMeals[mealType] || [],
    }));
  }, []);

  const handleSelectMealsBottomSheetClose = useCallback(() => {
    setSelectMealsToggle(false);
    setSelectedMeals([]);
    selectMealsBottomSheetRef?.current?.close();
  }, [selectMealsBottomSheetRef]);

  const handleSelectMealsBottomSheetOpen = useCallback(() => {
    setSelectMealsToggle(true);
    selectMealsBottomSheetRef?.current?.expand();
  }, [selectMealsBottomSheetRef]);

  const handleFilterMealsBottomSheetClose = useCallback(() => {
    setFilterMealsToggle(false);
    filterMealsBottomSheetRef?.current?.close();
  }, [filterMealsBottomSheetRef]);

  const handleFilterMealsBottomSheetOpen = useCallback(() => {
    setFilterMealsToggle(true);
    filterMealsBottomSheetRef?.current?.expand();
  }, [filterMealsBottomSheetRef]);

  const renderSectionHeader = useCallback(
    ({
      section: { title, data },
    }: {
      section: {
        title: string;
        data: DailyMeal_Meals[];
      };
    }) => {
      const numberOfCompleteMeals = data.filter(
        (meal) => meal.mealState === MealState.PENDING_REVIEW
      );

      return (
        <View style={styles.sectionHeaderContainer}>
          <View style={styles.sectionHeaderInnerContainer}>
            <Text_CardHeader>{title}</Text_CardHeader>
            {numberOfCompleteMeals && numberOfCompleteMeals.length >= 1 && (
              <CheckCircle size={24} weight="fill" color={colours.primary} />
            )}
          </View>
          <View style={styles.sectionHeaderDivider} />
        </View>
      );
    },
    [colours]
  );

  const getHeartRatingOfMeal = useCallback(
    (item: Meals) => {
      const review = uniqueReviewsMap.get(item._id.toString());
      return review ? review.makeAgain : false;
    },
    [uniqueReviewsMap]
  );

  const getRatingOfMealByKey = useCallback(
    (
      item: Meals,
      key: keyof {
        effort: string;
        taste: string;
      }
    ) => {
      const review = uniqueReviewsMap.get(item._id.toString());
      return review ? review[key] : null;
    },
    [uniqueReviewsMap]
  );

  const RenderSingleMealItem = ({
    item,
    mealsOfSameType,
  }: {
    item: DailyMeal_Meals;
    mealsOfSameType: DailyMeal_Meals[];
  }) => {
    const heartFilled = item.mealId ? getHeartRatingOfMeal(item.mealId) : false;
    const tasteRating = item.mealId
      ? getRatingOfMealByKey(item.mealId, "taste")
      : null;
    const effortRating = item.mealId
      ? getRatingOfMealByKey(item.mealId, "effort")
      : null;

    return (
      <SwipeableRow
        colours={colours}
        handleView={() => {}}
        handleDelete={() => {
          removeMealSelection(item, mealsOfSameType);
        }}
      >
        <View
          style={[styles.mealCategoryFlatlistContainer, { marginVertical: 6 }]}
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

            <View style={styles.ratingContainer}>
              <Text_TabIconText>Taste:</Text_TabIconText>
              {tasteRating !== null ? (
                <RenderRating rating={tasteRating} colours={colours} />
              ) : (
                <Text_TabIconText style={{ color: colours.accent }}>
                  No rating
                </Text_TabIconText>
              )}
            </View>

            <View style={styles.ratingContainer}>
              <Text_TabIconText>Effort: </Text_TabIconText>
              {effortRating !== null ? (
                <RenderRating rating={effortRating} colours={colours} />
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

  const removeMealSelection = useCallback(
    (item: DailyMeal_Meals, mealsOfSameType: DailyMeal_Meals[]) => {
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
    },
    [realm]
  );

  const renderDayRoutine = useCallback(
    ({
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
    },
    [colours]
  );

  const filterMealByCategoryIndex = useCallback(
    (index: number) => {
      return filteredMeals.filter((meal: { categories: string[] }) =>
        meal.categories.includes(mapping2[index])
      );
      // .sort((a: Meals, b: Meals) => a!.name!.localeCompare(b!.name!));
    },
    [filteredMeals]
  );

  const filteredMealsResult = useMemo(
    () => filterMealByCategoryIndex(activeIndex),
    [filteredMeals, activeIndex, filterMealByCategoryIndex]
  );

  useEffect(() => {
    setFilteredMealsByType(filteredMealsResult);
  }, [filteredMealsResult]);

  const handleMealCategoryChange = useCallback(
    (index: number) => {
      if (index === activeIndex) return;

      setFilteredMealsByType(filterMealByCategoryIndex(index));
      setSearchText("");
      setActiveIndex(index);

      // Reset scroll between category switching
      flatListScrollRef.current?.scrollToOffset({ offset: 0 });
    },
    [flatListScrollRef, activeIndex]
  );

  const RenderMealCategoryScrollView = useCallback(
    () => (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.mealCategoryContainer}
      >
        <TouchableOpacity
          key={0}
          onPress={() => handleMealCategoryChange(0)}
          delayPressIn={0}
          style={[
            {
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            },
            activeIndex === 0
              ? styles.segmentButtonActive
              : styles.segmentButton,
          ]}
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
          style={[
            activeIndex === 1
              ? styles.segmentButtonActive
              : styles.segmentButton,
          ]}
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
          style={[
            activeIndex === 2
              ? styles.segmentButtonActive
              : styles.segmentButton,
          ]}
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
          style={[
            {
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            },
            activeIndex === 3
              ? styles.segmentButtonActive
              : styles.segmentButton,
          ]}
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
    ),
    [colours, activeIndex]
  );

  const handleMealPress = useCallback(
    (dailyMeal: DailyMeal) => {
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
    },
    [uniqueReviewsMap, reviews, filteredMeals]
  );

  const RenderSingleMealFlatList = useCallback(
    ({ item }: { item: Meals }) => {
      const heartFilled = getHeartRatingOfMeal(item);
      const tasteRating = getRatingOfMealByKey(item, "taste");
      const effortRating = getRatingOfMealByKey(item, "effort");

      const isSelected = selectedMeals.some(
        (i) =>
          i.meal._id.toString() === item._id.toString() &&
          i.mealType === mapping[activeIndex]
      );

      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handleMealPress({ meal: item, mealType: mapping[activeIndex] });
          }}
          style={[
            styles.mealCategoryFlatlistContainer,
            isSelected && styles.mealCategoryItemSelected,
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

            <View style={styles.ratingContainer}>
              <Text_TabIconText>Taste:</Text_TabIconText>
              {tasteRating !== null ? (
                <RenderRating rating={tasteRating} colours={colours} />
              ) : (
                <Text_TabIconText style={{ color: colours.accent }}>
                  No rating
                </Text_TabIconText>
              )}
            </View>

            <View style={styles.ratingContainer}>
              <Text_TabIconText>Effort: </Text_TabIconText>
              {effortRating !== null ? (
                <RenderRating rating={effortRating} colours={colours} />
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
    },
    [colours, selectedMeals, activeIndex]
  );

  const onSearchTextChange = useCallback(
    (inputText: string) => {
      setSearchText(inputText);

      if (inputText === "") {
        setFilteredMealsByType(filteredMealsResult);
        return;
      }

      const filteredList = filteredMealsResult.filter((meal) =>
        meal.name!.toLowerCase().includes(inputText.toLowerCase())
      );

      // Filter meals by type based on name
      setFilteredMealsByType(filteredList);
    },
    [activeIndex, filteredMealsResult]
  );

  const addMeals = useCallback(() => {
    realm.write(() => {
      selectedMeals.forEach((selectedMeal) => {
        const foundMeal = currentDayRoutine!.meals.find(
          (meal) =>
            meal.mealState === MealState.PENDING_MEAL_SELECTION &&
            meal.mealType === selectedMeal.mealType
        );

        if (foundMeal) {
          foundMeal.mealState = MealState.PENDING_REVIEW;
          foundMeal.mealId = selectedMeal.meal;
        } else {
          currentDayRoutine?.meals.push({
            mealId: selectedMeal.meal,
            mealState: MealState.PENDING_REVIEW,
            mealType: selectedMeal.mealType,
          });
        }
      });
    });

    handleSelectMealsBottomSheetClose();
  }, [
    realm,
    selectedMeals,
    currentDayRoutine,
    handleSelectMealsBottomSheetClose,
  ]);

  const RenderSelectMealsBottomSheetContent = useCallback(() => {
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

          <View style={styles.searchBarContainer}>
            <View style={styles.searchbar}>
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
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={useCallback(() => {
                  handleFilterMealsBottomSheetOpen();
                  handleSelectMealsBottomSheetClose();
                }, [])}
                style={{ marginLeft: 6 }}
              >
                <Sliders
                  size={32}
                  color={colours.accent}
                  style={{ transform: [{ rotate: "90deg" }] }}
                />
              </TouchableOpacity>
              {(sortFilters.length > 0 ||
                filterFilters.length > 0 ||
                tasteRange[0] !== 0 ||
                tasteRange[1] !== 5 ||
                effortRange[0] !== 0 ||
                effortRange[1] !== 5) && (
                <TouchableOpacity
                  onPress={useCallback(() => {
                    resetFilters();
                    setFilteredMeals(Array.from(meals) as Meals[]);
                  }, [meals])}
                  style={{ marginLeft: 6 }}
                >
                  <XCircle size={32} color={colours.accent} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.quickAccessFlatListContainer}>
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
          <View style={styles.quickAccessBottomButtonContainer}>
            <Button_BackgroundThin
              style={{
                flex: 1,
              }}
              onPress={() => {
                setSearchText("");
                handleSelectMealsBottomSheetClose();
              }}
            >
              Cancel
            </Button_BackgroundThin>
            {selectMealsToggle && selectedMeals.length > 0 && (
              <Button_PrimaryThin
                style={styles.quickAccessConfirmButton}
                onPress={addMeals}
              >
                {selectMealsToggle && selectedMeals.length > 1
                  ? `Add Meals (${selectedMeals.length})`
                  : "Add Meal"}
              </Button_PrimaryThin>
            )}
          </View>
        </View>
      </BottomSheetView>
    );
  }, [
    colours,
    searchText,
    selectedMeals,
    selectMealsToggle,
    meals,
    filteredMealsByType,
  ]);

  const updateSortFilter = useCallback(
    (isChecked: boolean, sortFilter: SortFilter) => {
      setSortFilters((prevFilters) => {
        const filterExists = prevFilters.includes(sortFilter);

        if (isChecked && !filterExists) {
          // Add the sortFilter if it's checked and not already in the list
          return [...prevFilters, sortFilter];
        } else if (!isChecked && filterExists) {
          // Remove the sortFilter if it's unchecked and currently in the list
          return prevFilters.filter((filter) => filter !== sortFilter);
        }

        // Return previous filters if no changes are necessary
        return prevFilters;
      });
    },
    []
  );

  const updateFilterFilters = useCallback(
    (isChecked: boolean, filterFilter: FilterFilter) => {
      setFilterFilters((prevFilters) => {
        const filterExists = prevFilters.includes(filterFilter);

        if (isChecked && !filterExists) {
          return [...prevFilters, filterFilter];
        } else if (!isChecked && filterExists) {
          return prevFilters.filter((filter) => filter !== filterFilter);
        }

        return prevFilters;
      });
    },
    []
  );

  const sortFilteredResults = useCallback(
    (
      filteredMeals: Meals[],
      sortingCriteria: (review: Reviews | undefined) => number
    ): Meals[] => {
      return (Array.from(filteredMeals) as Meals[]).sort(
        (a: Meals, b: Meals) => {
          const aReview = uniqueReviewsMap.get(a._id.toString());
          const bReview = uniqueReviewsMap.get(b._id.toString());
          const aValue = sortingCriteria(aReview);
          const bValue = sortingCriteria(bReview);
          return bValue - aValue;
        }
      );
    },
    []
  );

  const handleFiltering = useCallback(() => {
    // Don't filter if no filtering was applied
    if (
      sortFilters.length === 0 &&
      filterFilters.length === 0 &&
      tasteRange[0] === 0 &&
      tasteRange[1] === 5 &&
      effortRange[0] === 0 &&
      effortRange[1] === 5
    ) {
      handleSelectMealsBottomSheetOpen();
      handleFilterMealsBottomSheetClose();
      return;
    }

    let filteredResults: Meals[] = [];

    // Handle Filtering
    if (filterFilters.includes(FilterFilter.ADDEDBYYOU))
      filteredResults.push(...getMealsByFilter(FilterFilter.ADDEDBYYOU));

    if (filterFilters.includes(FilterFilter.MAKEAGAIN))
      filteredResults.push(...getMealsByFilter(FilterFilter.MAKEAGAIN));

    if (filterFilters.includes(FilterFilter.TASTE))
      filteredResults.push(...getMealsByFilter(FilterFilter.TASTE));

    if (filterFilters.includes(FilterFilter.EFFORT))
      filteredResults.push(...getMealsByFilter(FilterFilter.EFFORT));

    let finalResults: Meals[] = [];
    filteredResults.forEach((meal) => {
      var found = false;
      for (var finalMeal of finalResults) {
        if (meal._id.toString() === finalMeal._id.toString()) {
          found = true;
          return;
        }
      }

      if (!found) finalResults.push(meal);
    });

    // Handle sorting
    if (sortFilters.includes(SortFilter.TASTE) && finalResults.length > 0)
      finalResults = sortFilteredResults(
        filteredResults,
        (review: Reviews | undefined) => (review ? review.taste : 0)
      );

    if (sortFilters.includes(SortFilter.EFFORT) && finalResults.length > 0)
      finalResults = sortFilteredResults(
        filteredResults,
        (review: Reviews | undefined) => (review ? review.effort : 0)
      );

    setFilteredMeals(finalResults);
    handleSelectMealsBottomSheetOpen();
    handleFilterMealsBottomSheetClose();
  }, [sortFilters, filterFilters, meals, reviews, uniqueReviewsMap]);

  const filterReviewsByRange = useCallback(
    (
      range: [number, number],
      key: keyof {
        effort: string;
        taste: string;
      }
    ) => {
      if (range[0] === 0 && range[1] === 5) return Array.from(meals);

      return Array.from(uniqueReviewsMap.values()).filter(
        (review) => review[key] >= range[0] && review[key] <= range[1]
      );
    },
    [uniqueReviewsMap]
  );

  const getMealsByFilter = useCallback(
    (filter: FilterFilter) => {
      let filtered = [];

      switch (filter) {
        case FilterFilter.ADDEDBYYOU:
          filtered = meals.filter(
            (meal) => meal.creatorId?.toString() === user._id.toString()
          );
          break;

        case FilterFilter.MAKEAGAIN:
          filtered = meals.filter(
            (meal) => uniqueReviewsMap.get(meal._id.toString())?.makeAgain
          );
          break;

        case FilterFilter.TASTE:
          filtered = filterReviewsByRange(tasteRange, "taste");
          break;

        case FilterFilter.EFFORT:
          filtered = filterReviewsByRange(effortRange, "effort");
          break;
      }

      return filtered ? Array.from(filtered as Meals[]) : [];
    },
    [meals, tasteRange, effortRange, user._id, reviews, uniqueReviewsMap]
  );

  useEffect(() => {
    setTasteCount(getMealsByFilter(FilterFilter.TASTE).length);
  }, [tasteRange]);

  useEffect(() => {
    setEffortCount(getMealsByFilter(FilterFilter.EFFORT).length);
  }, [effortRange]);

  const handleSortFilterPress = useCallback(
    (isChecked: boolean, sortFilter: SortFilter) => {
      updateSortFilter(isChecked, sortFilter);
    },
    []
  );

  const handleFilterFilterPress = useCallback(
    (isChecked: boolean, filterFilter: FilterFilter) => {
      updateFilterFilters(isChecked, filterFilter);
    },
    []
  );

  const RenderFilterMealsBottomSheetContent = useCallback(() => {
    return (
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <ScrollView contentContainerStyle={styles.bottomSheetBackground}>
          <View style={{ gap: 24 }}>
            <View style={styles.filterCard}>
              <Text_MainHeading style={{ paddingBottom: 12 }}>
                Sort
              </Text_MainHeading>
              <Checkbox
                label="Taste (High-Low)"
                isChecked={sortFilters.includes(SortFilter.TASTE)}
                isFilter={false}
                onPress={(isChecked) =>
                  handleSortFilterPress(isChecked, SortFilter.TASTE)
                }
              />
              <View
                style={{
                  marginVertical: 8,
                  height: 2,
                  backgroundColor: colours.secondary,
                }}
              />
              <Checkbox
                label="Effort (High-Low)"
                isChecked={sortFilters.includes(SortFilter.EFFORT)}
                isFilter={false}
                onPress={(isChecked) =>
                  handleSortFilterPress(isChecked, SortFilter.EFFORT)
                }
              />
            </View>

            <View style={styles.filterCard}>
              <Text_MainHeading style={{ paddingBottom: 12 }}>
                Filter
              </Text_MainHeading>
              <Checkbox
                label="Added by you"
                count={getMealsByFilter(FilterFilter.ADDEDBYYOU).length}
                isChecked={filterFilters.includes(FilterFilter.ADDEDBYYOU)}
                isFilter
                onPress={(isChecked) =>
                  handleFilterFilterPress(isChecked, FilterFilter.ADDEDBYYOU)
                }
              />
              <View
                style={{
                  marginVertical: 8,
                  height: 2,
                  backgroundColor: colours.secondary,
                }}
              />
              <Checkbox
                label="Would make again"
                count={getMealsByFilter(FilterFilter.MAKEAGAIN).length}
                isChecked={filterFilters.includes(FilterFilter.MAKEAGAIN)}
                isFilter
                onPress={(isChecked) =>
                  handleFilterFilterPress(isChecked, FilterFilter.MAKEAGAIN)
                }
              />
              <View style={styles.divider} />
              <FilterRangeSlider
                label="Taste"
                count={tasteCount}
                range={tasteRange}
                onValueChange={setTasteRange}
                colours={colours}
              />
              <View
                style={{
                  marginVertical: 8,
                  height: 2,
                  backgroundColor: colours.secondary,
                }}
              />
              <FilterRangeSlider
                label="Effort"
                count={effortCount}
                range={effortRange}
                onValueChange={setEffortRange}
                colours={colours}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{ borderTopWidth: 0.5, borderColor: "lightgray" }}>
          <Button_PrimaryThin onPress={handleFiltering} style={{ margin: 12 }}>
            Show Results
          </Button_PrimaryThin>
        </View>
      </View>
    );
  }, [
    colours,
    sortFilters,
    filterFilters,
    tasteCount,
    effortCount,
    effortRange,
    tasteRange,
    updateSortFilter,
    updateFilterFilters,
    handleFiltering,
    setTasteRange,
    setEffortRange,
  ]);

  const AddMealComponent = useCallback(() => {
    return (
      <TouchableOpacity
        onPress={handleSelectMealsBottomSheetOpen}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PlusCircle size={72} weight="fill" color={colours.accentButton} />
      </TouchableOpacity>
    );
  }, []);

  const Checkbox = React.memo(
    ({
      label,
      count,
      isChecked,
      isFilter,
      onPress,
    }: {
      label: string;
      count?: number;
      isChecked: boolean;
      isFilter: boolean;
      onPress: (isChecked: boolean) => void;
    }) => (
      <View style={styles.checkbox}>
        {isFilter ? (
          <Text_Text>
            {label} ({count})
          </Text_Text>
        ) : (
          <Text_Text>{label}</Text_Text>
        )}
        <View>
          <BouncyCheckbox
            isChecked={isChecked}
            onPress={onPress}
            fillColor={colours.primaryButton}
          />
        </View>
      </View>
    )
  );

  const FilterRangeSlider = React.memo(
    ({
      label,
      count,
      range,
      onValueChange,
      colours,
    }: {
      label: string;
      count: number;
      range: [number, number];
      onValueChange: Dispatch<SetStateAction<[number, number]>>;
      colours: ThemeColours;
    }) => (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text_Text>{`${label} (${count})`}</Text_Text>
        <View style={{ flex: 2 / 3, paddingRight: 12 }}>
          <RangeSlider
            range={range}
            minimumValue={0}
            maximumValue={5}
            step={0.5}
            minimumRange={0}
            crossingAllowed={false}
            outboundColor={colours.secondary}
            inboundColor={colours.lightPrimary}
            thumbTintColor={colours.darkPrimary}
            trackHeight={8}
            thumbSize={18}
            slideOnTap={true}
            onValueChange={onValueChange}
          />
        </View>
      </View>
    )
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        segmentButtonActive: {
          paddingHorizontal: 14,
          paddingVertical: 4,
          backgroundColor: colours.darkPrimary,
        },

        segmentButton: {
          paddingHorizontal: 14,
          paddingVertical: 4,
          backgroundColor: colours.secondary,
        },

        divider: {
          marginVertical: 8,
          height: 2,
          backgroundColor: colours.secondary,
        },

        mealCategoryScrollView: {
          paddingHorizontal: 12,
          gap: 4,
          marginBottom: 12,
        },

        checkbox: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: -16,
        },

        filterCard: {
          paddingHorizontal: 12,
          paddingVertical: 6,
          margin: 12,
          backgroundColor: colours.light,
          borderRadius: 12,
          elevation: 0.2,
        },

        searchbar: {
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          padding: 2,
          borderRadius: 12,
          backgroundColor: colours.secondary,
          flex: 1,
        },

        quickAccessBottomButtonContainer: {
          borderTopWidth: 0.5,
          borderColor: "lightgray",
          flex: 1 / 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          paddingHorizontal: 12,
          paddingVertical: 2,
        },

        quickAccessConfirmButton: {
          flex: 2,
          borderWidth: 1,
          borderColor: colours.darkPrimary,
        },

        quickAccessFlatListContainer: {
          flex: 1,
          backgroundColor: colours.secondary,
          marginHorizontal: 12,
          borderRadius: 6,
          paddingBottom: 6,
        },

        searchBarContainer: {
          flexDirection: "row",
          paddingHorizontal: 12,
          justifyContent: "space-between",
          alignItems: "center",
        },

        mealCategoryFlatlistContainer: {
          flex: 1,
          flexDirection: "row",
          backgroundColor: colours.background,
          borderRadius: 8,
          padding: 8,
          gap: 16,
        },

        mealCategoryItemSelected: {
          borderWidth: 6,
          borderColor: colours.darkPrimary,
        },

        mealCategoryContainer: {
          paddingHorizontal: 12,
          alignItems: "center",
          gap: 2,
        },

        ratingContainer: {
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          marginLeft: 6,
        },

        sectionHeaderContainer: {
          flex: 1,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          backgroundColor: colours.light,
          paddingHorizontal: 12,
        },

        sectionHeaderInnerContainer: {
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
        },

        sectionHeaderDivider: {
          height: 2,
          backgroundColor: colours.secondary,
          marginTop: 2,
        },

        bottomSheetBackground: { backgroundColor: colours.background },
      }),
    [colours]
  );

  if (!currentDayRoutine) return <Loading />;

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      {!selectMealsToggle && !filterMealsToggle && (
        <View style={{ flex: 1, gap: 0 }}>
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.mealCategoryScrollView}
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
                        : colours.darkPrimary,
                    borderRadius: 60,
                  }}
                >
                  <Text_TextBold
                    style={[
                      item.date.toDateString() ===
                        currentDayRoutine!.date.toDateString() && {
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
          <AddMealComponent />
        </View>
      )}

      {selectMealsToggle && !filterMealsToggle && (
        <BottomSheet
          ref={selectMealsBottomSheetRef}
          snapPoints={selectMealsSnapPoints}
          enableContentPanningGesture={false}
          handleComponent={null}
          handleIndicatorStyle={styles.bottomSheetBackground}
          backgroundStyle={styles.bottomSheetBackground}
        >
          <RenderSelectMealsBottomSheetContent />
        </BottomSheet>
      )}

      {filterMealsToggle && !selectMealsToggle && (
        <BottomSheet
          ref={filterMealsBottomSheetRef}
          snapPoints={filterMealsSnapPoints}
          enableContentPanningGesture={false}
          handleComponent={null}
          handleIndicatorStyle={styles.bottomSheetBackground}
          backgroundStyle={styles.bottomSheetBackground}
        >
          <RenderFilterMealsBottomSheetContent />
        </BottomSheet>
      )}
    </View>
  );
};

export default Screen;

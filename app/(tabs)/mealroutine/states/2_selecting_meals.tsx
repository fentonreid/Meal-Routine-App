import {
  Text_CardHeader,
  Text_TabIconText,
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
  Meals,
} from "@/models/schemas/Schemas";
import { SettingsContext } from "@/store/SettingsContext";
import { Stack, router } from "expo-router";
import moment from "moment";
import { CalendarBlank, CheckCircle, Lightning } from "phosphor-react-native";
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
}

const RenderImage = ({ imageURI, avatarPlaceholderText }: RenderImageProps) => {
  return (
    <TouchableOpacity style={{ borderRadius: 32 }}>
      {imageURI ? (
        <Image
          style={{
            width: 42,
            height: 42,
            borderRadius: 32,
          }}
          source={{ uri: imageURI }}
        />
      ) : (
        <View
          style={{
            width: 42,
            height: 42,
            backgroundColor: "lightgray",
            borderRadius: 32,
            justifyContent: "center",
            alignItems: "center",
          }}
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
      />
    );

  return <RenderImage imageURI={item.mealId!.imageURI} />;
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
            <CheckCircle size={32} color={colours.darkPrimary} weight="fill" />
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

const Screen = () => {
  const { colours } = useContext(SettingsContext);
  const [finished, setFinished] = useState(false);
  const [quickAccessToggle, setQuickAccessToggle] = useState(false);

  // Todo: PROBABLY NEED A CUSTOM DATA STRUCTURE FOR THIS...
  const [quickAccessSelections, setQuickAccessSelections] = useState<string[]>(
    []
  );

  const activeMealRoutine = MealRoutineStateManager({
    ignoreCurrentMealRoutineState: [MealRoutineState.SELECTING_MEALS],
  });

  // Quick access meal routine bottomSheet properties
  const quickAccessSnapPoints = useMemo(() => ["15%"], []);
  const quickAccessSnapPointsBottomSheetRef = useRef<BottomSheet>(null);

  const renderQuickAccessBackdrop = useCallback(
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

  // Bottom sheet open/close handles
  // Todo: Probably define logic to make sure only one is open at a time...
  const handleQuickAccessSnapPointsBottomSheetClose = () => {
    quickAccessSnapPointsBottomSheetRef?.current?.close();
    setQuickAccessToggle(false);
  };
  const handleQuickAccessSnapPointsBottomSheetOpen = () => {
    quickAccessSnapPointsBottomSheetRef?.current?.expand();
    setQuickAccessToggle(true);
  };

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
            createRoutineCustomHeaderRight(
              colours,
              quickAccessToggle
                ? handleQuickAccessSnapPointsBottomSheetClose
                : handleQuickAccessSnapPointsBottomSheetOpen
            ),
        }}
      />
      <View>
        {quickAccessToggle && (
          <View>
            <Text>DISPLAY QUICK ACCESS :PPPP</Text>
          </View>
        )}
        <FlatList
          data={activeMealRoutine!.dailyMeals}
          renderItem={(item) => renderDailyItem(item, colours)}
          keyExtractor={(item) => item.date.toDateString()}
          extraData={activeMealRoutine!.dailyMeals}
        />

        <BottomSheet
          ref={quickAccessSnapPointsBottomSheetRef}
          snapPoints={quickAccessSnapPoints}
          enablePanDownToClose={true}
          onClose={() => setQuickAccessToggle(false)}
          handleComponent={() => <></>}
          // backdropComponent={renderQuickAccessBackdrop}
          handleIndicatorStyle={{ backgroundColor: colours.background }}
          backgroundStyle={{
            backgroundColor: colours.background,
          }}
        >
          <BottomSheetView
            style={[
              styles.quickAccessBottomSheetContainer,
              {
                backgroundColor: colours.background,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                marginHorizontal: 12,
              },
            ]}
          >
            <Button_BackgroundThin
              style={{ flex: 1 }}
              onPress={handleQuickAccessSnapPointsBottomSheetClose}
            >
              Cancel
            </Button_BackgroundThin>
            {quickAccessSelections.length !== 0 && (
              <Button_PrimaryThin style={{ flex: 1 }} onPress={() => {}}>
                Quick Add
              </Button_PrimaryThin>
            )}
          </BottomSheetView>
        </BottomSheet>

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
      </View>
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

  quickAccessBottomSheetContainer: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
});

export default Screen;

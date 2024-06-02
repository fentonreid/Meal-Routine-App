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
import { useQuery } from "@realm/react";
import { Stack } from "expo-router";
import moment from "moment";
import { CalendarBlank, CheckCircle, Lightning } from "phosphor-react-native";
import { useContext } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { Realm } from "@realm/react";
import { Theme } from "@react-navigation/native";

// const createRoutineCustomHeaderLeft = (colours: ThemeColours) => {
//   return (
//     <TouchableOpacity
//       style={{
//         flexDirection: "row",
//         gap: Spacings.mainContainerViewPaddingHalved,
//         justifyContent: "flex-end",
//         alignItems: "center",
//       }}
//     >
//       <CalendarBlank size={24} weight="regular" color={colours.accent} />
//     </TouchableOpacity>
//   );
// };

const createRoutineCustomHeaderRight = (colours: ThemeColours) => {
  return (
    <TouchableOpacity
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

  const activeMealRoutine = MealRoutineStateManager({
    ignoreCurrentMealRoutineState: [MealRoutineState.SELECTING_MEALS],
  });

  return (
    <>
      <Stack.Screen
        options={{
          // headerLeft: () => createRoutineCustomHeaderLeft(colours),
          headerRight: () => createRoutineCustomHeaderRight(colours),
        }}
      />
      <View>
        <FlatList
          data={activeMealRoutine!.dailyMeals}
          renderItem={(item) => renderDailyItem(item, colours)}
          keyExtractor={(item) => item.date.toDateString()}
          extraData={activeMealRoutine!.dailyMeals}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mealCategoryUnderline: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});

export default Screen;

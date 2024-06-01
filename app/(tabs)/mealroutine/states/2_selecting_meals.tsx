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
import { CalendarBlank, Lightning } from "phosphor-react-native";
import { useContext } from "react";
import { FlatList, TouchableOpacity, View, Text, Image } from "react-native";
import { Realm } from "@realm/react";

const createRoutineCustomHeaderLeft = (colours: ThemeColours) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        gap: Spacings.mainContainerViewPaddingHalved,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <CalendarBlank size={24} weight="regular" color={colours.accent} />
    </TouchableOpacity>
  );
};

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
  [mealType: string]: number;
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

const renderDailyItem = ({ item }: { item: MealRoutine_DailyMeals }) => {
  let dateAsMoment = moment(item.date);

  // Get unique mealTypes in the current dailyMeal, this will be useful if more snacks are added
  const mealTypeCounts: MealTypeCount = {};

  for (var mealType in MealType) {
    // Get the number in daily meals
    let occurrences = item.meals.filter(
      (i) => i.mealType.toUpperCase() === mealType.toUpperCase()
    ).length;

    // Lowercase e.g. BREAKFAST to breakfast
    mealTypeCounts[mealType.charAt(0) + mealType.slice(1).toLowerCase()] =
      occurrences;
  }

  // Todo: Probably going to have to modify this to strikeout, breakfast, lunch, dinner once they are selected...
  // Todo: Would make sense to chain them somehow e.g. <Text>Breakfast</Text><Text><Text>,</Text><Text>Lunch</Text>

  const formattedMealTypes = Object.entries(mealTypeCounts)
    .map(([mealType, count]) => {
      const name = mealType;
      return count && count > 1 ? `${name} (${count})` : name;
    })
    .join(", ")
    .replace(/, ([^,]*snack(?:s?))/i, "\n+ $1");

  return (
    <View
      style={{
        padding: 6,
        borderRadius: 12,
        borderWidth: 1,
        marginHorizontal: 12,
        marginVertical: 6,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View>
        <Text_CardHeader>
          {item.day}, {dateAsMoment.format("Do")}
        </Text_CardHeader>
        <Text_TabIconText style={{}}>{formattedMealTypes}</Text_TabIconText>
      </View>
      <FlatList
        contentContainerStyle={{
          justifyContent: "flex-end",
          flex: 1,
          gap: 6,
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
          headerLeft: () => createRoutineCustomHeaderLeft(colours),
          headerRight: () => createRoutineCustomHeaderRight(colours),
        }}
      />
      <View>
        <FlatList
          data={activeMealRoutine!.dailyMeals}
          renderItem={renderDailyItem}
          keyExtractor={(item) => item.date.toDateString()}
          extraData={activeMealRoutine!.dailyMeals}
        />
      </View>
    </>
  );
};

export default Screen;

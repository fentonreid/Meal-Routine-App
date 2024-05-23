import { Button_AccentThin } from "@/components/ButtonStyles";
import { Text_Heading, Text_Text } from "@/components/TextStyles";
import Spacings from "@/constants/Spacings";
import { SettingsContext } from "@/store/SettingsContext";
import { useRouter } from "expo-router";
import { CalendarBlank, ForkKnife, NotePencil } from "phosphor-react-native";
import { useContext } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

const StackScreen2 = () => {
  const router = useRouter();
  const { colours } = useContext(SettingsContext);

  const screenHeight = Dimensions.get("window").height;

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          paddingBottom: Spacings.betweenCardAndHeading,
        }}
      >
        <View style={styles.innerContainer}>
          <View style={styles.headerRow}>
            <CalendarBlank
              color={colours["darkPrimary"]}
              weight="fill"
              size={Spacings.mainIconSize}
            />
            <Text_Heading>Meal Routines</Text_Heading>
          </View>
          <Text_Text>
            Create and view meal routines. Add reviews for each meal with
            ratings, descriptions, images and more...
          </Text_Text>
        </View>

        <View>
          <View style={styles.innerContainer}>
            <View style={styles.headerRow}>
              <ForkKnife
                color={colours["darkPrimary"]}
                weight="fill"
                size={Spacings.mainIconSize}
              />
              <Text_Heading>Manage Meals</Text_Heading>
            </View>
            <Text_Text>
              Create and view meals with over 50 to get you started. View
              overall ratings, ingredients, steps to make and more...
            </Text_Text>
          </View>
        </View>

        <View>
          <View style={styles.innerContainer}>
            <View style={styles.headerRow}>
              <NotePencil
                color={colours["darkPrimary"]}
                weight="fill"
                size={Spacings.mainIconSize}
              />
              <Text_Heading>Meal Routine Diary</Text_Heading>
            </View>
            <Text_Text>
              View all previously created meal routines. Reflect and reminisce
              on awesome past meals. Easily sort by effort, taste and more...
            </Text_Text>
          </View>
        </View>
      </View>

      <Button_AccentThin
        onPress={() => {
          router.push("/3_mealroutines");
        }}
      >
        Next
      </Button_AccentThin>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/getstarted/2.png")}
          style={{
            bottom: -(screenHeight / 19),
            left: 0,
            right: 0,
            height: 62,
            resizeMode: "contain",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacings.mainContainerViewPadding,
    marginBottom: Spacings.mainContainerViewPaddingHalved,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  innerContainer: {
    gap: Spacings.mainContainerViewPaddingHalved,
  },
});

export default StackScreen2;

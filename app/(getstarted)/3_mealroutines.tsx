import { Button_AccentThin } from "@/components/ButtonStyles";
import { Text_Heading, Text_Text } from "@/components/TextStyles";
import Spacings from "@/constants/Spacings";
import { useRouter } from "expo-router";
import { View, StyleSheet, Image, Dimensions } from "react-native";

const StackScreen3 = () => {
  const router = useRouter();

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          gap: Spacings.mainContainerViewPadding * 2,
        }}
      >
        <View style={styles.innerContainer}>
          <Text_Heading>Create Meal Routines</Text_Heading>
          <Text_Text>
            Create a meal routine to cover the next 7 days or less, of eating.
            Add breakfast, lunch, and dinner meals and, any snacks you might
            have.
          </Text_Text>
        </View>

        <View>
          <View style={styles.innerContainer}>
            <Text_Heading>View Meal Routines</Text_Heading>
            <Text_Text>
              Add reviews to each meal through the week, with descriptions,
              images and more. For each meal you can view the ingredients and
              steps needed to make the meal too.
            </Text_Text>
          </View>
        </View>
      </View>
      <Button_AccentThin
        onPress={() => {
          router.push("/4_meals");
        }}
      >
        Next
      </Button_AccentThin>

      <Image
        source={require("@/assets/images/getstarted/3.png")}
        style={{
          position: "absolute",
          top: screenHeight / 1.6,
          bottom: 0,
          left: screenWidth / 1.3,
          right: 0,
          height: 62,
          resizeMode: "contain",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacings.mainContainerViewPadding,
    marginBottom: Spacings.mainContainerViewPaddingHalved,
    marginTop: Spacings.mainContainerViewPadding,
  },

  innerContainer: {
    gap: 8,
  },
});

export default StackScreen3;

import { Button_AccentThin } from "@/components/ButtonStyles";
import { Text_Text } from "@/components/TextStyles";
import Spacings from "@/constants/Spacings";
import { useRouter } from "expo-router";
import { View, StyleSheet, Image, Dimensions } from "react-native";

const StackScreen5 = () => {
  const router = useRouter();
  const screenHeight = Dimensions.get("window").height;

  return (
    <View style={styles.container}>
      <View
        style={{ flex: 1, justifyContent: "space-evenly", paddingBottom: 144 }}
      >
        <Text_Text>
          I love the meal diary! A store of all previous meal routines that
          we've undertaken together. I get to update it and fill it with
          beautiful memories you can look back on.
        </Text_Text>
        <Text_Text>
          I'm a clever frog and can provide insights from time-to-time based on
          what you put in there, as well as providing input for future meal
          routines.
        </Text_Text>
        <Text_Text>
          You can easily sort and filter, based on year, effort and taste
          ratings too. All thanks to me of course, after all I am magical.
        </Text_Text>
      </View>

      <Button_AccentThin
        onPress={() => {
          router.push("/6_letsbegin");
        }}
      >
        Next
      </Button_AccentThin>

      <Image
        source={require("@/assets/images/getstarted/5.png")}
        style={{
          position: "absolute",
          top: -(screenHeight / 22),
          left: 0,
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
    marginTop: Spacings.mainContainerViewPaddingHalved,
  },

  itemRow: {
    flexDirection: "row",
    gap: 12,
  },
});

export default StackScreen5;

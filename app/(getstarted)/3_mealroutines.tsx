import { Button_AccentThin } from "@/components/ButtonStyles";
import { Text_Heading, Text_Text } from "@/components/TextStyles";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Image, Dimensions } from "react-native";

const StackScreen3 = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  console.log(screenHeight, screenWidth);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "space-around", paddingBottom: 140 }}>
        <View style={styles.innerContainer}>
          <Text_Heading>{t("getstarted_3_createheadertitle")}</Text_Heading>
          <Text_Text>{t("getstarted_3_createheadertext")}</Text_Text>
        </View>

        <View>
          <View style={styles.innerContainer}>
            <Text_Heading>{t("getstarted_3_viewheadertitle")}</Text_Heading>
            <Text_Text>{t("getstarted_3_viewheadertext")}</Text_Text>
          </View>
        </View>
      </View>
      <Button_AccentThin
        onPress={() => {
          router.push("/(getstarted)/4_meals");
        }}
      >
        {t("getstarted_nextbuttontext")}
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
    justifyContent: "space-evenly",
    padding: 24,
    marginBottom: 12,
  },

  innerContainer: {
    gap: 8,
  },
});

export default StackScreen3;

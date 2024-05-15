import { Button_AccentThin } from "@/components/ButtonStyles";
import { Text_Heading, Text_Text } from "@/components/TextStyles";
import { SettingsContext } from "@/store/SettingsContext";
import { useRouter } from "expo-router";
import { ArrowRight } from "phosphor-react-native";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Image, Dimensions } from "react-native";

const StackScreen4 = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { colours } = useContext(SettingsContext);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.innerContainer}>
          <Text_Text>{t("getstarted_4_mealstext")}</Text_Text>
        </View>

        <View style={{ flex: 1, justifyContent: "space-evenly", paddingBottom: 144 }}>
          <View style={styles.innerContainer}>
            <Text_Heading>{t("getstarted_4_categoryheadertitle")}</Text_Heading>
            <View style={styles.itemRow}>
              <ArrowRight color={colours["darkPrimary"]} />
              <Text_Text>{t("getstarted_4_breakfastitem")}</Text_Text>
            </View>
            <View style={styles.itemRow}>
              <ArrowRight color={colours["darkPrimary"]} />
              <Text_Text>{t("getstarted_4_lunchitem")}</Text_Text>
            </View>
            <View style={styles.itemRow}>
              <ArrowRight color={colours["darkPrimary"]} />
              <Text_Text>{t("getstarted_4_dinneritem")}</Text_Text>
            </View>
            <View style={styles.itemRow}>
              <ArrowRight color={colours["darkPrimary"]} />
              <Text_Text>{t("getstarted_4_snacksitem")}</Text_Text>
            </View>
          </View>
        </View>
      </View>

      <Button_AccentThin
        onPress={() => {
          router.push("/(getstarted)/5_diary");
        }}
      >
        {t("getstarted_nextbuttontext")}
      </Button_AccentThin>

      <Image
        source={require("@/assets/images/getstarted/4.png")}
        style={{
          position: "absolute",
          top: screenHeight / 1.8,
          left: -(screenWidth / 6),
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
    padding: 24,
    marginTop: 48,
    marginBottom: 12,
  },

  innerContainer: {
    gap: 8,
  },

  itemRow: {
    flexDirection: "row",
    gap: 12,
  },
});

export default StackScreen4;

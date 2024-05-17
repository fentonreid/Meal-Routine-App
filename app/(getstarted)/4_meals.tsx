import { Button_AccentThin } from "@/components/ButtonStyles";
import { Text_Heading, Text_ListText, Text_Text } from "@/components/TextStyles";
import Spacings from "@/constants/Spacings";
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

        <View style={{ flex: 1, marginTop: Spacings.betweenCardAndHeading }}>
          <View style={styles.innerContainer}>
            <Text_Heading>{t("getstarted_4_categoryheadertitle")}</Text_Heading>
            <View style={styles.itemRow}>
              <ArrowRight color={colours["darkPrimary"]} />
              <Text_ListText>{t("getstarted_4_breakfastitem")}</Text_ListText>
            </View>
            <View style={styles.itemRow}>
              <ArrowRight color={colours["darkPrimary"]} />
              <Text_ListText>{t("getstarted_4_lunchitem")}</Text_ListText>
            </View>
            <View style={styles.itemRow}>
              <ArrowRight color={colours["darkPrimary"]} />
              <Text_ListText>{t("getstarted_4_dinneritem")}</Text_ListText>
            </View>
            <View style={styles.itemRow}>
              <ArrowRight color={colours["darkPrimary"]} />
              <Text_ListText>{t("getstarted_4_snacksitem")}</Text_ListText>
            </View>
          </View>
        </View>
      </View>

      <Button_AccentThin
        onPress={() => {
          router.push("/5_diary");
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
    padding: Spacings.mainContainerViewPadding,
    marginTop: Spacings.mainContainerViewPadding,
    marginBottom: Spacings.mainContainerViewPaddingHalved,
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

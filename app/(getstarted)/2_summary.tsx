import { Button_AccentThin } from "@/components/ButtonStyles";
import { Text_Heading, Text_Text } from "@/components/TextStyles";
import Spacings from "@/constants/Spacings";
import { SettingsContext } from "@/store/SettingsContext";
import { useRouter } from "expo-router";
import { CalendarBlank, ForkKnife, NotePencil } from "phosphor-react-native";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Image, Dimensions } from "react-native";

const StackScreen2 = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { colours } = useContext(SettingsContext);

  const screenHeight = Dimensions.get("window").height;

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "space-around", paddingBottom: Spacings.betweenCardAndHeading }}>
        <View style={styles.innerContainer}>
          <View style={styles.headerRow}>
            <CalendarBlank color={colours["darkPrimary"]} weight="fill" size={Spacings.mainIconSize} />
            <Text_Heading>{t("getstarted_2_mealroutinesheadertitle")}</Text_Heading>
          </View>
          <Text_Text>{t("getstarted_2_mealroutinetext")}</Text_Text>
        </View>

        <View>
          <View style={styles.innerContainer}>
            <View style={styles.headerRow}>
              <ForkKnife color={colours["darkPrimary"]} weight="fill" size={Spacings.mainIconSize} />
              <Text_Heading>{t("getstarted_2_managemealsheadertitle")}</Text_Heading>
            </View>
            <Text_Text>{t("getstarted_2_managemealstext")}</Text_Text>
          </View>
        </View>

        <View>
          <View style={styles.innerContainer}>
            <View style={styles.headerRow}>
              <NotePencil color={colours["darkPrimary"]} weight="fill" size={Spacings.mainIconSize} />
              <Text_Heading>{t("getstarted_2_diaryheadertitle")}</Text_Heading>
            </View>
            <Text_Text>{t("getstarted_2_diarytext")}</Text_Text>
          </View>
        </View>
      </View>

      <Button_AccentThin
        onPress={() => {
          router.push("/3_mealroutines");
        }}
      >
        {t("getstarted_nextbuttontext")}
      </Button_AccentThin>

      <View
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, justifyContent: "center", alignItems: "center" }}
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

import { Button_AccentThin } from "@/components/ButtonStyles";
import { Text_Heading, Text_Text } from "@/components/TextStyles";
import { SettingsContext } from "@/store/SettingsContext";
import { useRouter } from "expo-router";
import { CalendarBlank, ForkKnife, NotePencil } from "phosphor-react-native";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";

const StackScreen2 = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { colours } = useContext(SettingsContext);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "space-around", paddingBottom: 32 }}>
        <View style={styles.innerContainer}>
          <View style={styles.headerRow}>
            <CalendarBlank color={colours["darkPrimary"]} weight="fill" size={32} />
            <Text_Heading>{t("getstarted_2_mealroutinesheadertitle")}</Text_Heading>
          </View>
          <Text_Text>{t("getstarted_2_mealroutinetext")}</Text_Text>
        </View>

        <View>
          <View style={styles.innerContainer}>
            <View style={styles.headerRow}>
              <ForkKnife color={colours["darkPrimary"]} weight="fill" size={32} />
              <Text_Heading>{t("getstarted_2_managemealsheadertitle")}</Text_Heading>
            </View>
            <Text_Text>{t("getstarted_2_managemealstext")}</Text_Text>
          </View>
        </View>

        <View>
          <View style={styles.innerContainer}>
            <View style={styles.headerRow}>
              <NotePencil color={colours["darkPrimary"]} weight="fill" size={32} />
              <Text_Heading>{t("getstarted_2_diaryheadertitle")}</Text_Heading>
            </View>
            <Text_Text>{t("getstarted_2_diarytext")}</Text_Text>
          </View>
        </View>
      </View>

      <Button_AccentThin
        onPress={() => {
          router.push("/(getstarted)/3_mealroutines");
        }}
      >
        {t("getstarted_nextbuttontext")}
      </Button_AccentThin>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginBottom: 12,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  innerContainer: {
    gap: 8,
  },
});

export default StackScreen2;

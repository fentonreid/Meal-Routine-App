import { Button_AccentThin } from "@/components/ButtonStyles";
import { Text_Text } from "@/components/TextStyles";
import { SettingsContext } from "@/store/SettingsContext";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";

const StackScreen5 = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "space-evenly", paddingBottom: 144 }}>
        <Text_Text>{t("getstarted_5_diary_text_1")}</Text_Text>
        <Text_Text>{t("getstarted_5_diary_text_2")}</Text_Text>
        <Text_Text>{t("getstarted_5_diary_text_3")}</Text_Text>
      </View>

      <Button_AccentThin
        onPress={() => {
          router.push("/(getstarted)/6_letsbegin");
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
    marginTop: 12,
    marginBottom: 12,
  },

  itemRow: {
    flexDirection: "row",
    gap: 12,
  },
});

export default StackScreen5;

import { Button_AccentThin } from "@/components/ButtonStyles";
import { Text_Heading, Text_Text } from "@/components/TextStyles";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";

const StackScreen3 = () => {
  const router = useRouter();
  const { t } = useTranslation();

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

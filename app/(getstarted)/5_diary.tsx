import { Button_AccentThin } from "@/components/ButtonStyles";
import { Text_Text } from "@/components/TextStyles";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Image, Dimensions } from "react-native";

const StackScreen5 = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "space-evenly", paddingBottom: 144 }}>
        <Text_Text>{t("getstarted_5_diary_text_1")}</Text_Text>
        <Text_Text>{t("getstarted_5_diary_text_2")}</Text_Text>
        <Text_Text>{t("getstarted_5_diary_text_3")}</Text_Text>
      </View>

      <Button_AccentThin
        onPress={() => {
          router.push("/6_letsbegin");
        }}
      >
        {t("getstarted_nextbuttontext")}
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

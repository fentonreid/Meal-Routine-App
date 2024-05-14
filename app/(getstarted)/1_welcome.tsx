import { Button_PrimaryWide } from "@/components/ButtonStyles";
import { Text_MainHeading, Text_SuperHeader, Text_Text } from "@/components/TextStyles";
import { SettingsContext } from "@/store/SettingsContext";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Image } from "react-native";

const StackScreen1 = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { colours } = useContext(SettingsContext);

  return (
    <View style={styles.container}>
      <Text_SuperHeader>{t("getstarted_1_welcometext")}</Text_SuperHeader>
      <Image
        source={require("@/assets/images/getstarted/frogWaiter.png")}
        style={{ flex: 3, resizeMode: "contain", alignSelf: "center", transform: [{ scaleX: -1 }] }}
      />
      <View style={{ flex: 1 }}>
        <Text_MainHeading>
          {t("getstarted_1_mynameis")}
          <Text_MainHeading style={{ color: colours["accent"] }}> {t("getstarted_1_frogname")}</Text_MainHeading>
        </Text_MainHeading>
        <Text_Text style={{ paddingLeft: 12 }}>{t("getstarted_1_slogan")}</Text_Text>
      </View>
      <Button_PrimaryWide
        onPress={() => {
          router.push("/(getstarted)/2_summary");
        }}
      >
        {t("getstarted_1_welcomebuttontext")}
      </Button_PrimaryWide>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    gap: 12,
  },
});

export default StackScreen1;

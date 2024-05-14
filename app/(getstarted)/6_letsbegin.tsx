import { Button_PrimaryWide } from "@/components/ButtonStyles";
import { Text_MainHeading, Text_SuperHeader, Text_Text } from "@/components/TextStyles";
import { SettingsContext } from "@/store/SettingsContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Image } from "react-native";

const StackScreen6 = () => {
  const { toggleGetStartedEnabled } = useContext(SettingsContext);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text_SuperHeader>{t("getstarted_6_headerTitle")}</Text_SuperHeader>
      <Image
        source={require("@/assets/images/getstarted/frogWaiter.png")}
        style={{ flex: 3, resizeMode: "contain", alignSelf: "center" }}
      />
      <View style={{ flex: 1 }}>
        <Text_MainHeading>{t("getstarted_6_hurraytext")}</Text_MainHeading>
        <Text_Text style={{ marginLeft: 12 }}>{t("getstarted_6_slogan")}</Text_Text>
      </View>
      <Button_PrimaryWide
        onPress={() => {
          toggleGetStartedEnabled(false);
        }}
      >
        {t("getstarted_6_startbuttontext")}
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
export default StackScreen6;

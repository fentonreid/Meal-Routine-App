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
      <Text_SuperHeader style={{ flex: 1 }}>Welcome</Text_SuperHeader>
      <Image
        source={require("@/assets/images/frogWaiter.png")}
        style={{ flex: 3, resizeMode: "contain", alignSelf: "center" }}
      />
      <View style={{ flex: 1 }}>
        <Text_MainHeading>
          My name is <Text_MainHeading style={{ color: colours["accent"] }}>Froggo</Text_MainHeading>
        </Text_MainHeading>
        <Text_Text style={{ marginLeft: 12 }}>Your meal routine and diary companion</Text_Text>
      </View>
      <View style={{ flex: 2 }}>
        <Button_PrimaryWide
          onPress={() => {
            router.push("/(getstarted)/2_summary");
          }}
        >
          {t("getstarted_welcomebuttontext")}
        </Button_PrimaryWide>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
});

export default StackScreen1;

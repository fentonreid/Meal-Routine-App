import { Button_Wide } from "@/components/ButtonStyles";
import {
  Text_MainHeading,
  Text_SuperHeader,
  Text_Text,
} from "@/components/TextStyles";
import Spacings from "@/constants/Spacings";
import { SettingsContext } from "@/store/SettingsContext";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { View, StyleSheet, Image } from "react-native";

const StackScreen1 = () => {
  const router = useRouter();
  const { colours } = useContext(SettingsContext);

  return (
    <View style={styles.container}>
      <Text_SuperHeader>Welcome</Text_SuperHeader>
      <Image
        source={require("@/assets/images/getstarted/frogWaiter.png")}
        style={{
          flex: 3,
          resizeMode: "contain",
          alignSelf: "center",
          transform: [{ scaleX: -1 }],
        }}
      />
      <View style={{ flex: 1 }}>
        <Text_MainHeading>
          My name is
          <Text_MainHeading style={{ color: colours["accent"] }}>
            {" "}
            Froggo
          </Text_MainHeading>
        </Text_MainHeading>
        <Text_Text
          style={{ paddingLeft: Spacings.mainContainerViewPaddingHalved }}
        >
          Your meal routine companion
        </Text_Text>
      </View>
      <Button_Wide
        onPress={() => {
          router.push("/2_summary");
        }}
      >
        Get Started
      </Button_Wide>
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

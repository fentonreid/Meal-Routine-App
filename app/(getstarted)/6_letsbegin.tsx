import { Button_Wide } from "@/components/ButtonStyles";
import {
  Text_MainHeading,
  Text_SuperHeader,
  Text_Text,
} from "@/components/TextStyles";
import Spacings from "@/constants/Spacings";
import { SettingsContext } from "@/store/SettingsContext";
import { useContext } from "react";
import { View, StyleSheet, Image } from "react-native";

const StackScreen6 = () => {
  const { toggleGetStartedEnabled } = useContext(SettingsContext);

  return (
    <View style={styles.container}>
      <Text_SuperHeader>Let's Begin</Text_SuperHeader>
      <Image
        source={require("@/assets/images/getstarted/frogWaiter.png")}
        style={{ flex: 3, resizeMode: "contain", alignSelf: "center" }}
      />
      <View style={{ flex: 1 }}>
        <Text_MainHeading>Hurray!</Text_MainHeading>
        <Text_Text
          style={{ marginLeft: Spacings.mainContainerViewPaddingHalved }}
        >
          Enough chit-chat let’s begin!
        </Text_Text>
      </View>
      <Button_Wide
        onPress={() => {
          toggleGetStartedEnabled(false);
        }}
      >
        Start
      </Button_Wide>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacings.mainContainerViewPadding,
    flex: 1,
    gap: Spacings.mainContainerViewPaddingHalved,
  },
});
export default StackScreen6;

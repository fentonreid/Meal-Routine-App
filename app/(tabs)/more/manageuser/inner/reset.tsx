import { Button_Wide } from "@/components/ButtonStyles";
import { Text_ListText, Text_Text } from "@/components/TextStyles";
import Spacings from "@/constants/Spacings";
import { SettingsContext } from "@/store/SettingsContext";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Alert, View } from "react-native";

const Screen = () => {
  const { resetUserPreferences, colours } = useContext(SettingsContext);

  const confirmResetAlert = () =>
    Alert.alert(
      "Reset All User Preferences",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: resetUserPreferences },
      ],
      {
        cancelable: true,
      }
    );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        padding: Spacings.mainContainerViewPadding,
        marginTop: Spacings.betweenCardAndHeading,
      }}
    >
      <View>
        <Text_Text>You are about to reset all user preferences for:</Text_Text>
        <Text_ListText
          style={{
            marginVertical: Spacings.listItemBottomSpacing,
            paddingLeft: Spacings.mainContainerViewPaddingHalved,
          }}
        >
          {"\u2B24"} Vibrations
        </Text_ListText>
        <Text_ListText
          style={{ marginBottom: Spacings.listItemBottomSpacing, paddingLeft: Spacings.mainContainerViewPaddingHalved }}
        >
          {"\u2B24"} Colour Theme
        </Text_ListText>
        <Text_ListText
          style={{ marginBottom: Spacings.listItemBottomSpacing, paddingLeft: Spacings.mainContainerViewPaddingHalved }}
        >
          {"\u2B24"} And more...
        </Text_ListText>
      </View>

      <View style={{ gap: Spacings.verticalButtonGap }}>
        <Button_Wide onPress={confirmResetAlert} backgroundColour={colours["accentButton"]}>
          Confirm
        </Button_Wide>
      </View>
    </View>
  );
};

export default Screen;

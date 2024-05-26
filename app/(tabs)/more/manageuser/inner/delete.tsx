import { Button_Wide } from "@/components/ButtonStyles";
import { Text_ListText, Text_Text } from "@/components/TextStyles";
import Spacings from "@/constants/Spacings";
import { SettingsContext } from "@/store/SettingsContext";
import { useContext } from "react";
import { Alert, View } from "react-native";

const Screen = () => {
  const { resetUserPreferences, colours } = useContext(SettingsContext);

  const confirmDeletionAlert = () =>
    Alert.alert(
      "Delete All Stored Data",
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
        <Text_Text>
          You are about to delete your account with all stored data, this
          includes:
        </Text_Text>
        <Text_ListText
          style={{
            marginVertical: Spacings.listItemBottomSpacing,
            paddingLeft: Spacings.mainContainerViewPaddingHalved,
          }}
        >
          {"\u2B24"} All meal routine data
        </Text_ListText>
        <Text_ListText
          style={{
            marginBottom: Spacings.listItemBottomSpacing,
            paddingLeft: Spacings.mainContainerViewPaddingHalved,
          }}
        >
          {"\u2B24"} All created meals including recipes and reviews
        </Text_ListText>
        <Text_ListText
          style={{
            marginBottom: Spacings.listItemBottomSpacing,
            paddingLeft: Spacings.mainContainerViewPaddingHalved,
          }}
        >
          {"\u2B24"} All user preferences
        </Text_ListText>
      </View>

      <View style={{ gap: Spacings.verticalButtonGap }}>
        <Button_Wide
          onPress={confirmDeletionAlert}
          backgroundColour={colours["accentButton"]}
        >
          Confirm
        </Button_Wide>
      </View>
    </View>
  );
};

export default Screen;

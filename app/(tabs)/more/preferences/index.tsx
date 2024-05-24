import SettingItem from "@/components/SettingItem";
import { Text_MainHeading } from "@/components/TextStyles";
import LayoutStyles from "@/constants/LayoutStyles";
import Spacings from "@/constants/Spacings";
import { SettingItem_ActionStyle } from "@/models/enums/SettingItem_ActionStyle";
import { SettingItem_BorderStyle } from "@/models/enums/SettingItem_BorderStyle";
import { SettingsContext } from "@/store/SettingsContext";
import { Bell, Vibrate, Palette } from "phosphor-react-native";
import { useContext } from "react";
import { ScrollView } from "react-native";

const Screen = () => {
  const {
    vibrationsEnabled,
    toggleVibrations,
    notificationEnabled,
    toggleNotifications,
    colourTheme,
    toggleColourTheme,
  } = useContext(SettingsContext);

  return (
    <ScrollView contentContainerStyle={LayoutStyles.settingListScrollView}>
      <Text_MainHeading
        style={{ marginBottom: Spacings.betweenHeadingAndMainContent }}
      >
        General
      </Text_MainHeading>
      <SettingItem
        Icon={Bell}
        Title="Notifications"
        BorderStyle={SettingItem_BorderStyle.START}
        Action={{
          type: SettingItem_ActionStyle.TOGGLE,
          SwitchValue: notificationEnabled,
          SwitchOnValueChange: toggleNotifications,
        }}
      />

      <SettingItem
        Icon={Vibrate}
        Title="Vibration"
        Action={{
          type: SettingItem_ActionStyle.TOGGLE,
          SwitchValue: vibrationsEnabled,
          SwitchOnValueChange: toggleVibrations,
        }}
      />

      <SettingItem
        Icon={Palette}
        Title="Light Colour Theme"
        Action={{
          type: SettingItem_ActionStyle.TOGGLE,
          SwitchValue: colourTheme === "light",
          SwitchOnValueChange: (value) => {
            toggleColourTheme(value ? "light" : "dark");
          },
        }}
      />
    </ScrollView>
  );
};

export default Screen;

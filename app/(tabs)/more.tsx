import SettingItem from "@/components/SettingItem";
import { SettingItem_ActionStyle } from "@/models/enums/SettingItem_ActionStyle";
import { SettingItem_BorderStyle } from "@/models/enums/SettingItem_BorderStyle";
import { SettingsContext } from "@/store/SettingsContext";
import { useRouter } from "expo-router";
import { Export, GearSix, User, AirTrafficControl } from "phosphor-react-native";
import { useContext } from "react";
import { ScrollView } from "react-native";

const MoreScreen = () => {
  const router = useRouter();
  const { vibrationsEnabled, toggleVibrations } = useContext(SettingsContext);

  return (
    <ScrollView contentContainerStyle={{ marginHorizontal: 24, gap: 2, marginTop: 32 }}>
      <SettingItem
        Icon={GearSix}
        Title="Settings"
        BorderStyle={SettingItem_BorderStyle.START}
        Action={{
          type: SettingItem_ActionStyle.CHEVRON,
          OnPress: () => {
            router.push("(debug)/icon");
          },
        }}
      />

      <SettingItem
        Icon={Export}
        Title="Import / Export"
        Action={{
          type: SettingItem_ActionStyle.CHEVRON,
          OnPress: () => {
            router.push("(debug)/font");
          },
        }}
      />

      <SettingItem
        Icon={User}
        Title="Manage User Data"
        Action={{
          type: SettingItem_ActionStyle.CHEVRON,
          OnPress: () => {
            router.push("(debug)/locale");
          },
        }}
      />

      <SettingItem
        Icon={AirTrafficControl}
        Title="Test Switch"
        BorderStyle={SettingItem_BorderStyle.END}
        Action={{
          type: SettingItem_ActionStyle.TOGGLE,
          SwitchValue: vibrationsEnabled,
          SwitchOnValueChange: toggleVibrations,
        }}
      />
    </ScrollView>
  );
};

export default MoreScreen;

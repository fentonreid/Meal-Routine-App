import SettingItem from "@/components/SettingItem";
import { SettingItem_ActionStyle } from "@/models/enums/SettingItem_ActionStyle";
import { SettingItem_BorderStyle } from "@/models/enums/SettingItem_BorderStyle";
import { SettingsContext } from "@/store/SettingsContext";
import { useRouter } from "expo-router";
import { Export, GearSix, User, AirTrafficControl } from "phosphor-react-native";
import { useContext } from "react";
import { ScrollView, View, Text } from "react-native";

const MoreScreen = () => {
  const router = useRouter();
  const { vibrationsEnabled, toggleVibrations } = useContext(SettingsContext);

  return (
    <View>
      <Text>Credits</Text>
    </View>
  );
};

export default MoreScreen;

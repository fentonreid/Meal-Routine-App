import { View, StyleSheet, Switch } from "react-native";
import * as CT from "@/components/TextStyles";
import { useContext } from "react";
import { SettingsContext } from "@/store/SettingsContext";

const SettingsScreen = () => {
  const settingsContext = useContext(SettingsContext);

  return (
    <View>
      <View
        style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 12 }}
      >
        <CT.Text_Heading>VIBRATIONS</CT.Text_Heading>
        <Switch value={settingsContext.vibrationsEnabled} onValueChange={settingsContext.toggleVibrations} />
      </View>

      <View
        style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 12 }}
      >
        <CT.Text_Heading>NOTIFICATIONS</CT.Text_Heading>
        <Switch value={settingsContext.notificationEnabled} onValueChange={settingsContext.toggleNotifications} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SettingsScreen;

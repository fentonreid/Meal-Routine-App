import { View, StyleSheet, Switch, Touchable, TouchableOpacity } from "react-native";
import * as CT from "@/components/TextStyles";
import { useContext } from "react";
import { SettingsContext } from "@/store/SettingsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = () => {
  const settingsContext = useContext(SettingsContext);

  const fetchAllItems = async () => {
    AsyncStorage.getAllKeys().then((keys) => AsyncStorage.multiGet(keys).then((data) => console.log(data)));
  };

  return (
    <View style={{ gap: 24 }}>
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

      <View
        style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 12 }}
      >
        <CT.Text_Heading>GET STARTED</CT.Text_Heading>
        <Switch value={settingsContext.getStartedEnabled} onValueChange={settingsContext.toggleGetStartedEnabled} />
      </View>

      <View
        style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 12 }}
      >
        <CT.Text_Heading>COLOUR THEME</CT.Text_Heading>
        <Switch
          value={settingsContext.colourTheme === "light"}
          onValueChange={(value) => {
            settingsContext.toggleColourTheme(value ? "light" : "dark");
          }}
        />
      </View>

      <View
        style={{
          paddingHorizontal: 12,
        }}
      >
        <TouchableOpacity onPress={fetchAllItems}>
          <CT.Text_Heading>GET ALL FROM ASYNC STORAGE</CT.Text_Heading>
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingHorizontal: 12,
        }}
      >
        <TouchableOpacity onPress={settingsContext.resetUserPreferences}>
          <CT.Text_Heading>REMOVE ALL FROM STORAGE</CT.Text_Heading>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;

import { View, Switch, TouchableOpacity } from "react-native";
import * as CT from "@/components/TextStyles";
import { useContext } from "react";
import { SettingsContext } from "@/store/SettingsContext";
import { useUser } from "@realm/react";
import { storage } from "@/app/_layout";

const SettingsScreen = () => {
  const settingsContext = useContext(SettingsContext);
  const user = useUser();

  const fetchAllItems = () => {
    const allKeys = storage.getAllKeys();
    const allItems = allKeys.reduce((acc: any, key) => {
      acc[key] =
        storage.getString(key) ||
        storage.getNumber(key) ||
        storage.getBoolean(key);
      return acc;
    }, {});

    console.log(allItems);
  };

  return (
    <View style={{ gap: 24 }}>
      <TouchableOpacity
        onPress={() => {
          user.logOut();
        }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 12,
        }}
      >
        <CT.Text_Heading>SIGN OUT REALM USER</CT.Text_Heading>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 12,
        }}
      >
        <CT.Text_Heading>VIBRATIONS</CT.Text_Heading>
        <Switch
          value={settingsContext.vibrationsEnabled}
          onValueChange={settingsContext.toggleVibrations}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 12,
        }}
      >
        <CT.Text_Heading>NOTIFICATIONS</CT.Text_Heading>
        <Switch
          value={settingsContext.notificationEnabled}
          onValueChange={settingsContext.toggleNotifications}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 12,
        }}
      >
        <CT.Text_Heading>GET STARTED</CT.Text_Heading>
        <Switch
          value={settingsContext.getStartedEnabled}
          onValueChange={settingsContext.toggleGetStartedEnabled}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 12,
        }}
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

import React, { useContext } from "react";
import { Tabs } from "expo-router";
import FontStyles from "@/constants/FontStyles";
import { SettingsContext } from "@/store/SettingsContext";

const DebugTabLayout = () => {
  const { colours } = useContext(SettingsContext);

  return (
    <Tabs
      screenOptions={{
        headerTitleStyle: { ...FontStyles.mainHeading, color: colours["mainHeading"] },
        headerTitleAlign: "center",
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="settingsdebug"
        options={{
          title: "Settings",
        }}
      />

      <Tabs.Screen
        name="locale"
        options={{
          title: "Locale",
        }}
      />

      <Tabs.Screen
        name="vibrations"
        options={{
          title: "Vibrations",
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
        }}
      />

      <Tabs.Screen
        name="font"
        options={{
          title: "Text Styles",
        }}
      />

      <Tabs.Screen
        name="icon"
        options={{
          title: "Icons",
        }}
      />
      <Tabs.Screen
        name="button"
        options={{
          title: "Button",
        }}
      />
    </Tabs>
  );
};

export default DebugTabLayout;

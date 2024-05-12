import React from "react";
import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="settings"
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
    </Tabs>
  );
};

export default TabLayout;

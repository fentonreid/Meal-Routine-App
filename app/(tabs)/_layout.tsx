import React from "react";
import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="index"
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
        name="settings"
        options={{
          title: "Settings",
        }}
      />
      <Tabs.Screen
        name="vibrations"
        options={{
          title: "Vibrations",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

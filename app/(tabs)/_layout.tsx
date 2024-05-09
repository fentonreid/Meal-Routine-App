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
    </Tabs>
  );
};

export default TabLayout;

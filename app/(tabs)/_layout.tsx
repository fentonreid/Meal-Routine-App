import React from "react";
import { Tabs } from "expo-router";

const MainTabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="create" options={{ title: "Create" }} />
      <Tabs.Screen name="meals" options={{ title: "Meals" }} />
      <Tabs.Screen name="diary" options={{ title: "Diary" }} />
      <Tabs.Screen name="more" options={{ title: "More" }} />
      <Tabs.Screen
        name="(debug)"
        options={{
          headerShown: false,
          title: "DEBUG",
        }}
      />
    </Tabs>
  );
};

export default MainTabLayout;

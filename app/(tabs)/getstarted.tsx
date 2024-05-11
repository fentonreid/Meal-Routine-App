import { ScrollView } from "react-native";
import * as CT from "@/components/TextStyles";
import React, { useContext } from "react";
import { SettingsContext } from "@/store/SettingsContext";

const LocaleScreen = () => {
  const { getStartedEnabled } = useContext(SettingsContext);

  return (
    <ScrollView>
      <CT.Text_MealCardTitle>Notifications are currently: {getStartedEnabled ? "ON" : "OFF"}</CT.Text_MealCardTitle>
    </ScrollView>
  );
};

export default LocaleScreen;

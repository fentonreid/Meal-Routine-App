import * as Haptics from "expo-haptics";
import { SettingsContext } from "@/store/SettingsContext";
import { useContext } from "react";

const VibrationManager = () => {
  const { vibrationsEnabled } = useContext(SettingsContext);

  const impact = (impactFeedbackStyle: Haptics.ImpactFeedbackStyle) => {
    if (vibrationsEnabled) {
      Haptics.impactAsync(impactFeedbackStyle);
    }
  };

  const notification = (notificationFeedbackType: Haptics.NotificationFeedbackType) => {
    if (vibrationsEnabled) {
      Haptics.notificationAsync(notificationFeedbackType);
    }
  };

  return {
    impact,
    notification,
  };
};

export default VibrationManager;

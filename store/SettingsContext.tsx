import { createContext, useEffect, useState } from "react";
import { SettingsContextModel } from "@/models/SettingsContext";

export const SettingsContext = createContext<SettingsContextModel>({
  notificationEnabled: true,
  vibrationsEnabled: true,
  lightThemeEnabled: true,

  toggleNotifications: (_) => {},
  toggleVibrations: (_) => {},
  toggleLightTheme: (_) => {},

  resetUserPreferences: () => {},
});

const SettingsContextProvider = ({ children }: any) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [vibrationsEnabled, setVibrationsEnabled] = useState<boolean>(true);
  const [lightThemeEnabled, setLightThemeEnabled] = useState<boolean>(true);

  useEffect(() => {
    console.log("VIBRATIONS NOW HAS A VALUE OF: ", vibrationsEnabled);
  }, [vibrationsEnabled]);

  const toggleNotifications = (newState: boolean) => {
    setNotificationsEnabled(newState);
  };

  const toggleVibrations = (newState: boolean) => {
    setVibrationsEnabled(newState);
  };

  const toggleLightTheme = (newState: boolean) => {
    setLightThemeEnabled(newState);
  };

  const resetUserPreferences = () => {
    setNotificationsEnabled(true);
    setVibrationsEnabled(true);
    setLightThemeEnabled(true);
  };

  const values: SettingsContextModel = {
    notificationEnabled: notificationsEnabled,
    vibrationsEnabled: vibrationsEnabled,
    lightThemeEnabled: lightThemeEnabled,
    toggleNotifications: toggleNotifications,
    toggleVibrations: toggleVibrations,
    toggleLightTheme: toggleLightTheme,
    resetUserPreferences: resetUserPreferences,
  };

  return <SettingsContext.Provider value={values}>{children}</SettingsContext.Provider>;
};

export default SettingsContextProvider;

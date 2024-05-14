import { createContext, useEffect, useState } from "react";
import { SettingsContextModel } from "@/models/SettingsContext";
import { ThemeOptions } from "@/models/ThemeOptions";
import * as Notifications from "expo-notifications";
import { AvailableLocales } from "@/models/AvailableLocales";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "@/models/AsyncStorageKeys";
import { COLOURS } from "@/constants/Colours";
import NotificationManager from "@/managers/NotificationManager";
import VibrationManager from "@/managers/VibrationManager";

export const SettingsContext = createContext<SettingsContextModel>({
  notificationEnabled: true,
  vibrationsEnabled: true,
  colourTheme: "light",
  getStartedEnabled: true,
  colours: {
    background: "#F4F4F4",
    darkerBackground: "#EFEFEF",
    text: "#342E53",
    primary: "#66CCC5",
    secondary: "#D9D9D9",
    accent: "#B13E57",
    primaryButton: "#66CCC5",
    accentButton: "#B13E57",
    buttonText: "#FFFFFF",
    mainHeading: "#000000",
    light: "#FFFFFF",
    tabSelected: "#B13E57",
    tabUnselected: "#3F3F3F",
    darkPrimary: "#289B93",
  },

  toggleNotifications: (_) => {},
  toggleVibrations: (_) => {},
  toggleColourTheme: (_) => {},
  toggleLocale: (_) => {},
  toggleGetStartedEnabled: (_) => {},

  resetUserPreferences: () => {},
});

const SettingsContextProvider = ({ children }: any) => {
  const { i18n } = useTranslation();

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [vibrationsEnabled, setVibrationsEnabled] = useState<boolean>(true);
  const [lightThemeEnabled, setLightThemeEnabled] = useState<ThemeOptions>("light");
  const [getStartedEnabled, setGetStartedEnabled] = useState<boolean>(true);

  const colours = COLOURS[lightThemeEnabled];

  // Fetch initial values from Async Storage, keep defaults if not present
  useEffect(() => {
    const fetchFromAsyncStorage = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem(AsyncStorageKeys.NOTIFICATIONS);
        if (storedNotifications) setNotificationsEnabled(storedNotifications === "true");

        const storedVibrationsEnabled = await AsyncStorage.getItem(AsyncStorageKeys.VIBRATIONS);
        if (storedVibrationsEnabled) setVibrationsEnabled(storedVibrationsEnabled === "true");

        const storedLightTheme = await AsyncStorage.getItem(AsyncStorageKeys.COLOURTHEME);
        if (storedLightTheme && (storedLightTheme as ThemeOptions) !== null)
          setLightThemeEnabled(storedLightTheme as ThemeOptions);

        const storedGetStarted = await AsyncStorage.getItem(AsyncStorageKeys.GETSTARTED);
        if (storedGetStarted) setGetStartedEnabled(storedGetStarted === "true");

        const storedLanguageLocale = await AsyncStorage.getItem(AsyncStorageKeys.LANGUAGELOCALE);
        if (storedLanguageLocale && storedLanguageLocale in AvailableLocales !== null)
          toggleLocale(storedLanguageLocale as AvailableLocales);
      } catch (error) {
        console.log("Error getting initial values from Async Storage: " + error);
      }
    };

    fetchFromAsyncStorage();
  }, []);

  const toggleLocale = async (availableLocale: AvailableLocales) => {
    await AsyncStorage.setItem(AsyncStorageKeys.LANGUAGELOCALE, availableLocale);

    i18n.changeLanguage(availableLocale);
  };

  const toggleNotifications = async (newState: boolean) => {
    // Cancel all pending notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    await AsyncStorage.setItem(AsyncStorageKeys.NOTIFICATIONS, newState ? "true" : "false");

    setNotificationsEnabled(newState);
  };

  const toggleVibrations = async (newState: boolean) => {
    await AsyncStorage.setItem(AsyncStorageKeys.VIBRATIONS, newState ? "true" : "false");
    setVibrationsEnabled(newState);
  };

  const toggleColourTheme = async (newState: ThemeOptions) => {
    await AsyncStorage.setItem(AsyncStorageKeys.COLOURTHEME, newState);
    setLightThemeEnabled(newState);
  };

  const toggledGetStartedEnabled = async (newState: boolean) => {
    await AsyncStorage.setItem(AsyncStorageKeys.GETSTARTED, newState ? "true" : "false");
    setGetStartedEnabled(newState);
  };

  const resetUserPreferences = async () => {
    await AsyncStorage.multiRemove([
      AsyncStorageKeys.GETSTARTED,
      AsyncStorageKeys.NOTIFICATIONS,
      AsyncStorageKeys.VIBRATIONS,
      AsyncStorageKeys.COLOURTHEME,
      AsyncStorageKeys.LANGUAGELOCALE,
    ]);

    setGetStartedEnabled(true);
    setNotificationsEnabled(true);
    setVibrationsEnabled(true);
    setLightThemeEnabled("light");

    toggleLocale(AvailableLocales.EN);
  };

  const values: SettingsContextModel = {
    notificationEnabled: notificationsEnabled,
    vibrationsEnabled: vibrationsEnabled,
    colourTheme: lightThemeEnabled,
    getStartedEnabled: getStartedEnabled,
    colours: colours,

    toggleNotifications: toggleNotifications,
    toggleVibrations: toggleVibrations,
    toggleColourTheme: toggleColourTheme,
    toggleGetStartedEnabled: toggledGetStartedEnabled,

    resetUserPreferences: resetUserPreferences,
    toggleLocale: toggleLocale,
  };

  return <SettingsContext.Provider value={values}>{children}</SettingsContext.Provider>;
};

export default SettingsContextProvider;

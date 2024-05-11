import { createContext, useEffect, useState } from "react";
import { SettingsContextModel, ThemeOptions } from "@/models/SettingsContext";
import * as Notifications from "expo-notifications";
import { AvailableLocales } from "@/models/AvailableLocales";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "@/models/AsyncStorageKeys";

export const SettingsContext = createContext<SettingsContextModel>({
  notificationEnabled: true,
  vibrationsEnabled: true,
  colourTheme: "light",
  getStartedEnabled: true,

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

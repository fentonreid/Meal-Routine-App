import { I18n } from "i18n-js";
import { AvailableLocales } from "@/models/AvailableLocales";

export interface SettingsContextModel {
  notificationEnabled: boolean;
  vibrationsEnabled: boolean;
  lightThemeEnabled: boolean;
  getStartedEnabled: boolean;

  toggleNotifications: (newState: boolean) => void;
  toggleVibrations: (newState: boolean) => void;
  toggleLightTheme: (newState: boolean) => void;
  toggleLocale: (AvailableLocales: AvailableLocales) => void;
  toggleGetStartedEnabled: (newState: boolean) => void;

  resetUserPreferences: () => void;
}

import { AvailableLocales } from "@/models/AvailableLocales";

export interface SettingsContextModel {
  notificationEnabled: boolean;
  vibrationsEnabled: boolean;
  colourTheme: "dark" | "light";
  getStartedEnabled: boolean;

  toggleNotifications: (newState: boolean) => void;
  toggleVibrations: (newState: boolean) => void;
  toggleColourTheme: (newState: ThemeOptions) => void;
  toggleLocale: (AvailableLocales: AvailableLocales) => void;
  toggleGetStartedEnabled: (newState: boolean) => void;

  resetUserPreferences: () => void;
}

export type ThemeOptions = "dark" | "light";

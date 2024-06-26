import { ThemeColours } from "@/models/ThemeColours";
import { ThemeOptions } from "@/models/ThemeOptions";

export interface SettingsContextModel {
  notificationEnabled: boolean;
  vibrationsEnabled: boolean;
  colourTheme: "dark" | "light";
  getStartedEnabled: boolean;
  colours: ThemeColours;

  toggleNotifications: (newState: boolean) => void;
  toggleVibrations: (newState: boolean) => void;
  toggleColourTheme: (newState: ThemeOptions) => void;
  toggleGetStartedEnabled: (newState: boolean) => void;

  resetUserPreferences: () => void;
}

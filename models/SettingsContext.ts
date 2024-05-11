export interface SettingsContextModel {
  notificationEnabled: boolean;
  vibrationsEnabled: boolean;
  lightThemeEnabled: boolean;

  toggleNotifications: (newState: boolean) => void;
  toggleVibrations: (newState: boolean) => void;
  toggleLightTheme: (newState: boolean) => void;

  resetUserPreferences: () => void;
}

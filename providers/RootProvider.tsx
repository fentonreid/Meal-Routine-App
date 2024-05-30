import LoginScreen from "@/components/auth/AuthLoginAndSignup";
import SettingsContextProvider from "@/store/SettingsContext";
import { AppProvider, UserProvider } from "@realm/react";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import LoadFontProvider from "@/providers/LoadFontsProviders";
import SubscriptionFetchingProvider from "./SubscriptionFetchingProvider";
import "react-native-get-random-values";

// Keep the splashscreen showing until disabled after fonts are loaded
SplashScreen.preventAutoHideAsync();

// Setup notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

const RootProvider = () => {
  const AppId = "application-0-zzrojcv";

  return (
    <>
      <SettingsContextProvider>
        <LoadFontProvider>
          <AppProvider id={AppId}>
            <UserProvider fallback={<LoginScreen />}>
              <SubscriptionFetchingProvider />
            </UserProvider>
          </AppProvider>
        </LoadFontProvider>
      </SettingsContextProvider>
    </>
  );
};

export default RootProvider;

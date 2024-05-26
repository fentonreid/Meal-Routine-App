import LoginScreen from "@/components/auth/AuthLoginAndSignup";
import SettingsContextProvider from "@/store/SettingsContext";
import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import * as Schema from "@/models/schemas/Schemas";
import { OpenRealmBehaviorType } from "realm";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import LoadFontProvider from "@/providers/LoadFontsProviders";
import MainNavigationProvider from "./MainNavigationProvider";

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
              <RealmProvider
                schema={[
                  Schema.usersSchema,
                  Schema.users_diarySchema,
                  Schema.unitsSchema,
                  Schema.units_conversionFactorSchema,
                  Schema.shoppingCategoriesSchema,
                  Schema.reviewsSchema,
                  Schema.mealsSchema,
                  Schema.meals_ingredientsSchema,
                  Schema.mealRoutinesSchema,
                  Schema.mealRoutines_mealsSchema,
                  Schema.mealRoutines_shoppingListSchema,
                  Schema.ingredientsSchema,
                ]}
                sync={{
                  flexible: true,
                  newRealmFileBehavior: {
                    type: OpenRealmBehaviorType.DownloadBeforeOpen,
                  },
                  existingRealmFileBehavior: {
                    type: OpenRealmBehaviorType.DownloadBeforeOpen,
                  },
                  // Add initial subscriptions to sync a preferred
                  // subset of data to the device
                  initialSubscriptions: {
                    update: (mutableSubs, realm) => {
                      mutableSubs.add(realm.objects("users"));
                      mutableSubs.add(
                        realm
                          .objects("ingredients")
                          .filtered("isPublic == true")
                      );
                      mutableSubs.add(realm.objects("mealRoutines"));
                      mutableSubs.add(
                        realm.objects("meals").filtered("isPublic == true")
                      );
                      // mutableSubs.add(realm.objects("reviews"));
                      mutableSubs.add(
                        realm
                          .objects("shoppingCategories")
                          .filtered("isPublic == true")
                      );
                      mutableSubs.add(
                        realm.objects("units").filtered("isPublic == true")
                      );
                    },
                  },
                  onError: (session, error) => {
                    // Replace this with a preferred logger in production.
                    console.error("ERROR WITH REAL WRAPPER: ", error.message);
                  },
                }}
              >
                <MainNavigationProvider />
              </RealmProvider>
            </UserProvider>
          </AppProvider>
        </LoadFontProvider>
      </SettingsContextProvider>
    </>
  );
};

export default RootProvider;

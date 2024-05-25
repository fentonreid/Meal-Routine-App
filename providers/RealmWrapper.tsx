import { useApp } from "@realm/react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { OpenRealmBehaviorType } from "realm";
import { useEffect, useState } from "react";
import Realm from "realm";
import { RealmContext } from "@/store/RealmContext";

const { RealmProvider } = RealmContext;

const RealmWrapper = (props: any) => {
  const realmApp = useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const login = async () => {
      const credentials = Realm.Credentials.anonymous();
      //const credentials = Realm.Credentials.emailPassword(
      //"test@test.com",
      //"testing"
      //);

      await realmApp.logIn(credentials);

      console.log("SIGNED IN");
      setIsLoggedIn(true);
    };

    login();
  }, [realmApp]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoggedIn ? (
        <RealmProvider
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
                mutableSubs.add(
                  realm.objects("users").filtered('username == "Fenton Reid"')
                );
                mutableSubs.add(
                  realm.objects("ingredients").filtered("isPublic == true")
                );
                mutableSubs.add(realm.objects("mealRoutines"));
                mutableSubs.add(
                  realm.objects("meals").filtered("isPublic == true")
                );
                mutableSubs.add(realm.objects("reviews"));
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
          {props.children}
        </RealmProvider>
      ) : (
        <ActivityIndicator size={"large"} />
      )}
    </SafeAreaView>
  );
};

export default RealmWrapper;

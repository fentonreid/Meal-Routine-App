import { useApp } from "@realm/react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { OpenRealmBehaviorType } from "realm";
import { useEffect, useState } from "react";
import { RealmContext } from "./Task";
import Realm from "realm";

const { RealmProvider } = RealmContext;

function RealmWrapper(): JSX.Element {
  const app = useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const login = async () => {
      const credentials = Realm.Credentials.anonymous();
      await app.logIn(credentials);
      console.log("HERE???");
      setIsLoggedIn(true);
    };
    login();
  }, [app]);

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
              type: OpenRealmBehaviorType.OpenImmediately,
            },
          }}
          children={undefined}
        ></RealmProvider>
      ) : (
        <ActivityIndicator size={"small"} />
      )}
    </SafeAreaView>
  );
}

export default RealmWrapper;

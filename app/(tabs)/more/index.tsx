import SettingItem from "@/components/SettingItem";
import LayoutStyles from "@/constants/LayoutStyles";
import { SettingItem_ActionStyle } from "@/models/enums/SettingItem_ActionStyle";
import { SettingItem_BorderStyle } from "@/models/enums/SettingItem_BorderStyle";
import { useRouter } from "expo-router";
import { ArrowsLeftRight, GearSix, LockKey, User, UserList } from "phosphor-react-native";
import { Platform, ScrollView, Text, View } from "react-native";
import Constants from "expo-constants";
import { Text_Input } from "@/components/TextStyles";
import Spacings from "@/constants/Spacings";

const SettingsScreen = () => {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={LayoutStyles.settingListScrollView}>
      <SettingItem
        Icon={GearSix}
        Title="User Preferences"
        BorderStyle={SettingItem_BorderStyle.START}
        Action={{
          type: SettingItem_ActionStyle.CHEVRON,
          OnPress: () => {
            router.push("/more/preferences");
          },
        }}
      />

      <SettingItem
        Icon={User}
        Title="Manage User Data"
        BorderStyle={SettingItem_BorderStyle.END}
        Action={{
          type: SettingItem_ActionStyle.CHEVRON,
          OnPress: () => {
            router.push("/more/manageuser");
          },
        }}
      />

      <SettingItem
        Icon={ArrowsLeftRight}
        Title="Import / Export"
        Action={{
          type: SettingItem_ActionStyle.CHEVRON,
          OnPress: () => {
            router.push("/more/migrate");
          },
        }}
      />

      <View style={{ gap: 2, marginTop: Spacings.betweenCardAndHeading }}>
        <SettingItem
          Icon={LockKey}
          Title="Privacy Policy"
          BorderStyle={SettingItem_BorderStyle.START}
          Action={{
            type: SettingItem_ActionStyle.CHEVRON,
            OnPress: () => {
              router.push("/more/inner/privacy");
            },
          }}
        />

        <SettingItem
          Icon={UserList}
          Title="Credits"
          BorderStyle={SettingItem_BorderStyle.END}
          Action={{
            type: SettingItem_ActionStyle.CHEVRON,
            OnPress: () => {
              router.push("/more/inner/credits");
            },
          }}
        />
      </View>

      <View style={{ marginTop: Spacings.betweenCardAndHeading }}>
        <Text_Input style={{ textAlign: "center" }}>App Version: {Constants.expoConfig?.version}</Text_Input>
        {Platform.OS === "android" && (
          <Text_Input style={{ textAlign: "center" }}>
            Android Version Code: {Constants.expoConfig?.android?.versionCode}
          </Text_Input>
        )}

        {Platform.OS === "ios" && <Text_Input>IOS: {Constants.expoConfig?.ios?.buildNumber}</Text_Input>}
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

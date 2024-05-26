import SettingItem from "@/components/SettingItem";
import { Text_MainHeading } from "@/components/TextStyles";
import LayoutStyles from "@/constants/LayoutStyles";
import Spacings from "@/constants/Spacings";
import { SettingItem_ActionStyle } from "@/models/enums/SettingItem_ActionStyle";
import { SettingItem_BorderStyle } from "@/models/enums/SettingItem_BorderStyle";
import { useRouter } from "expo-router";
import { Radioactive, UserCircleMinus, ChartBar } from "phosphor-react-native";
import { ScrollView } from "react-native";

const Screen = () => {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={LayoutStyles.settingListScrollView}>
      <Text_MainHeading
        style={{ marginBottom: Spacings.betweenHeadingAndMainContent }}
      >
        Statistics
      </Text_MainHeading>
      <SettingItem
        Icon={ChartBar}
        Title="Usage Statistics"
        BorderStyle={SettingItem_BorderStyle.SINGLE}
        Action={{
          type: SettingItem_ActionStyle.CHEVRON,
          OnPress: () => {
            router.push("/more/manageuser/inner/usage");
          },
        }}
      />

      <Text_MainHeading
        style={{
          marginTop: Spacings.betweenCardAndHeading,
          marginBottom: Spacings.betweenHeadingAndMainContent,
        }}
      >
        Reset
      </Text_MainHeading>
      <SettingItem
        Icon={UserCircleMinus}
        Title="Reset User Preferences"
        BorderStyle={SettingItem_BorderStyle.SINGLE}
        Action={{
          type: SettingItem_ActionStyle.CHEVRON,
          OnPress: () => {
            router.push("/more/manageuser/inner/reset");
          },
        }}
      />

      <Text_MainHeading
        style={{
          marginTop: Spacings.betweenCardAndHeading,
          marginBottom: Spacings.betweenHeadingAndMainContent,
        }}
      >
        Delete Account
      </Text_MainHeading>
      <SettingItem
        Icon={Radioactive}
        Title="Delete Account"
        BorderStyle={SettingItem_BorderStyle.SINGLE}
        Action={{
          type: SettingItem_ActionStyle.CHEVRON,
          OnPress: () => {
            router.push("/more/manageuser/inner/delete");
          },
        }}
      />
    </ScrollView>
  );
};

export default Screen;

import SettingItem from "@/components/SettingItem";
import LayoutStyles from "@/constants/LayoutStyles";
import { SettingItem_ActionStyle } from "@/models/enums/SettingItem_ActionStyle";
import { SettingItem_BorderStyle } from "@/models/enums/SettingItem_BorderStyle";
import { useRouter } from "expo-router";
import { DownloadSimple, Export, Globe, LockKey } from "phosphor-react-native";
import { ScrollView } from "react-native";

const Screen = () => {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={LayoutStyles.settingListScrollView}>
      <SettingItem
        Icon={DownloadSimple}
        Title="Import"
        BorderStyle={SettingItem_BorderStyle.START}
        Action={{
          type: SettingItem_ActionStyle.CHEVRON,
          OnPress: () => {
            router.push("/more/migrate/inner/import");
          },
        }}
      />

      <SettingItem
        Icon={Export}
        Title="Export"
        BorderStyle={SettingItem_BorderStyle.END}
        Action={{
          type: SettingItem_ActionStyle.CHEVRON,
          OnPress: () => {
            router.push("/more/migrate/inner/export");
          },
        }}
      />
    </ScrollView>
  );
};

export default Screen;

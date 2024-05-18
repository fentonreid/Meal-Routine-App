import LanguageItem from "@/components/LanguageItem";
import { Text_Text } from "@/components/TextStyles";
import LayoutStyles from "@/constants/LayoutStyles";
import Spacings from "@/constants/Spacings";
import { locales } from "@/models/AvailableLocales";
import { SettingItem_BorderStyle } from "@/models/enums/SettingItem_BorderStyle";
import { SettingsContext } from "@/store/SettingsContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View, Text } from "react-native";

const Screen = () => {
  const { toggleLocale } = useContext(SettingsContext);
  const { i18n } = useTranslation();

  return (
    <View style={{ flex: 1, marginTop: Spacings.betweenCardAndHeading }}>
      <Text_Text
        style={{
          marginBottom: Spacings.betweenHeadingAndMainContent,
          marginHorizontal: Spacings.mainContainerViewPaddingHalved,
        }}
      >
        Choose your preferred language from the list below.
      </Text_Text>
      <ScrollView
        contentContainerStyle={[
          LayoutStyles.settingListScrollView,
          { paddingBottom: Spacings.betweenCardAndHeading * 2 },
        ]}
      >
        {Object.values(locales).map((currentLocale, index) => {
          return (
            <LanguageItem
              key={currentLocale.LocaleId}
              ImagePath={currentLocale.ImagePath}
              Title={currentLocale.DisplayAs}
              Active={i18n.language === currentLocale.LocaleId}
              BorderStyle={
                index === 0
                  ? SettingItem_BorderStyle.START
                  : index === Object.keys(locales).length - 1
                  ? SettingItem_BorderStyle.END
                  : undefined
              }
              OnPress={() => toggleLocale(currentLocale.Enum)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Screen;

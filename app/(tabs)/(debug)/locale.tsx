import { ScrollView, TouchableOpacity, Text } from "react-native";
import * as CT from "@/components/TextStyles";
import React, { useContext } from "react";
import { SettingsContext } from "@/store/SettingsContext";
import { AvailableLocales } from "@/models/AvailableLocales";
import { useTranslation } from "react-i18next";

const LocaleScreen = () => {
  const { toggleLocale } = useContext(SettingsContext);
  const { i18n, t } = useTranslation();

  return (
    <ScrollView>
      <CT.Text_Heading style={{ marginBottom: 32 }}>Current locale is: {i18n.resolvedLanguage}</CT.Text_Heading>

      <TouchableOpacity
        onPress={() => {
          toggleLocale(AvailableLocales.FR);
        }}
      >
        <CT.Text_ListText>Change locale To: French </CT.Text_ListText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          toggleLocale(AvailableLocales.EN);
        }}
      >
        <CT.Text_ListText>Change locale To: English</CT.Text_ListText>
      </TouchableOpacity>
      <CT.Text_ListText style={{ marginTop: 48 }}>Locale test: {t("hello")}</CT.Text_ListText>
    </ScrollView>
  );
};

export default LocaleScreen;

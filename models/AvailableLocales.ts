import { ImageSourcePropType } from "react-native";

export enum AvailableLocales {
  EN = "en",
  FR = "fr",
}

export const locales: {
  [key in AvailableLocales]: {
    ImagePath: ImageSourcePropType;
    LocaleId: string;
    DisplayAs: string;
    Enum: AvailableLocales;
  };
} = {
  [AvailableLocales.EN]: {
    LocaleId: "en",
    DisplayAs: "English",
    ImagePath: require("@/assets/images/flags/gb.webp"),
    Enum: AvailableLocales.EN,
  },
  [AvailableLocales.FR]: {
    LocaleId: "fr",
    DisplayAs: "French",
    ImagePath: require("@/assets/images/flags/fr.webp"),
    Enum: AvailableLocales.FR,
  },
};

import { ThemeColours } from "@/models/ThemeColours";
import { COLOR_SCHEME } from "@/models/enums/ColourTheme";

const COLOURS_LIGHT: ThemeColours = {
  background: "#F4F4F4",
  darkerBackground: "#EFEFEF",
  text: "#342E53",
  primary: "#66CCC5",
  secondary: "#D9D9D9",
  accent: "#B13E57",
  primaryButton: "#66CCC5",
  accentButton: "#B13E57",
  buttonText: "#FFFFFF",
  mainHeading: "#000000",
  light: "#FFFFFF",
  tabSelected: "#B13E57",
  tabUnselected: "#3F3F3F",
  darkPrimary: "#289B93",
};

const COLOURS_DARK: ThemeColours = {
  background: "#130E17",
  darkerBackground: "#2A282B",
  text: "#615697",
  primary: "#339992",
  secondary: "#BB9B9A",
  accent: "#C14E67",
  primaryButton: "#66CCC5",
  accentButton: "#C14E67",
  buttonText: "#110A0A",
  mainHeading: "#FFFFFF",
  light: "#1C1C1C",
  tabSelected: "#B13E57",
  tabUnselected: "#3F3F3F",
  darkPrimary: "#289B93",
};

export const COLOURS = {
  [COLOR_SCHEME.LIGHT]: COLOURS_LIGHT,
  [COLOR_SCHEME.DARK]: COLOURS_DARK,
};

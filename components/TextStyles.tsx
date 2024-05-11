import { Text, TextProps } from "react-native";
import ts from "@/constants/FontStyles";
import { COLOURS } from "@/constants/Colours";
import { useContext } from "react";
import { SettingsContext } from "@/store/SettingsContext";

export const Text_Input = (props: TextProps) => {
  const { colourTheme } = useContext(SettingsContext);
  const colours = COLOURS[colourTheme];

  return <Text style={[ts.textInput, { color: colours["text"] }, props.style]}>{props.children}</Text>;
};

export const Text_TabIconText = (props: TextProps) => {
  const { colourTheme } = useContext(SettingsContext);
  const colours = COLOURS[colourTheme];

  return <Text style={[ts.tabIconText, { color: colours["text"] }, props.style]}>{props.children}</Text>;
};

export const Text_TabIconSelected = (props: TextProps) => {
  const { colourTheme } = useContext(SettingsContext);
  const colours = COLOURS[colourTheme];

  return <Text style={[ts.tabIconSelected, { color: colours["text"] }, props.style]}>{props.children}</Text>;
};

export const Text_ListTextBold = (props: TextProps) => {
  const { colourTheme } = useContext(SettingsContext);
  const colours = COLOURS[colourTheme];

  return <Text style={[ts.listTextBold, { color: colours["text"] }, props.style]}>{props.children}</Text>;
};

export const Text_MealCardTitle = (props: TextProps) => {
  const { colourTheme } = useContext(SettingsContext);
  const colours = COLOURS[colourTheme];

  return <Text style={[ts.mealCardTitle, { color: colours["text"] }, props.style]}>{props.children}</Text>;
};

export const Text_Text = (props: TextProps) => {
  const { colourTheme } = useContext(SettingsContext);
  const colours = COLOURS[colourTheme];

  return <Text style={[ts.mealCardTitle, { color: colours["text"] }, props.style]}>{props.children}</Text>;
};

export const Text_ListText = (props: TextProps) => {
  const { colourTheme } = useContext(SettingsContext);
  const colours = COLOURS[colourTheme];

  return <Text style={[ts.listText, { color: colours["text"] }, props.style]}>{props.children}</Text>;
};

export const Text_SmallerButtonTitle = (props: TextProps) => {
  const { colourTheme } = useContext(SettingsContext);
  const colours = COLOURS[colourTheme];

  return <Text style={[ts.smallerButtonTitle, { color: colours["text"] }, props.style]}>{props.children}</Text>;
};

export const Text_CardHeader = (props: TextProps) => {
  const { colourTheme } = useContext(SettingsContext);
  const colours = COLOURS[colourTheme];

  return <Text style={[ts.cardHeader, { color: colours["text"] }, props.style]}>{props.children}</Text>;
};

export const Text_Heading = (props: TextProps) => {
  const { colourTheme } = useContext(SettingsContext);
  const colours = COLOURS[colourTheme];

  return <Text style={[ts.heading, { color: colours["text"] }, props.style]}>{props.children}</Text>;
};

export const Text_MainHeading = (props: TextProps) => {
  const { colourTheme } = useContext(SettingsContext);
  const colours = COLOURS[colourTheme];

  return <Text style={[ts.mainHeading, { color: colours["text"] }, props.style]}>{props.children}</Text>;
};

export const Text_PrimaryButtonText = (props: TextProps) => {
  const { colourTheme } = useContext(SettingsContext);
  const colours = COLOURS[colourTheme];

  return <Text style={[ts.primaryButtonText, { color: colours["text"] }, props.style]}>{props.children}</Text>;
};

export const Text_SuperHeader = (props: TextProps) => {
  const { colourTheme } = useContext(SettingsContext);
  const colours = COLOURS[colourTheme];

  return <Text style={[ts.superHeader, { color: colours["text"] }, props.style]}>{props.children}</Text>;
};

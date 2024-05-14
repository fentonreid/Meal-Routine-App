import { TextProps, TouchableOpacity, StyleSheet } from "react-native";
import { useContext } from "react";
import { SettingsContext } from "@/store/SettingsContext";
import * as CT from "@/components/TextStyles";

export interface Props {
  children: React.ReactNode;
  onPress?: () => void;
}

export const Button_PrimaryWide = (props: Props) => {
  const { colours } = useContext(SettingsContext);

  return (
    <TouchableOpacity
      style={[styles.wideButtonContainer, { backgroundColor: colours["darkPrimary"] }]}
      onPress={props.onPress}
    >
      <CT.Text_PrimaryButtonText style={{ color: colours["buttonText"], textAlign: "center" }}>
        {props.children}
      </CT.Text_PrimaryButtonText>
    </TouchableOpacity>
  );
};

export const Button_AccentThin = (props: TextProps) => {
  const { colours } = useContext(SettingsContext);

  return (
    <TouchableOpacity
      style={[styles.thinButtonContainer, { backgroundColor: colours["accentButton"] }]}
      onPress={props.onPress}
    >
      <CT.Text_SmallerButtonTitle style={{ color: colours["buttonText"], textAlign: "center" }}>
        {props.children}
      </CT.Text_SmallerButtonTitle>
    </TouchableOpacity>
  );
};

export const Button_PrimaryThin = (props: TextProps) => {
  const { colours } = useContext(SettingsContext);

  return (
    <TouchableOpacity
      style={[styles.thinButtonContainer, { backgroundColor: colours["darkPrimary"] }]}
      onPress={props.onPress}
    >
      <CT.Text_SmallerButtonTitle style={{ color: colours["buttonText"], textAlign: "center" }}>
        {props.children}
      </CT.Text_SmallerButtonTitle>
    </TouchableOpacity>
  );
};

export const Button_BackgroundThin = (props: TextProps) => {
  const { colours } = useContext(SettingsContext);

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.thinButtonContainer,
        { backgroundColor: colours["background"], borderWidth: 1, borderColor: colours["mainHeading"] },
      ]}
    >
      <CT.Text_SmallerButtonTitle style={{ color: colours["text"], textAlign: "center" }}>
        {props.children}
      </CT.Text_SmallerButtonTitle>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wideButtonContainer: {
    marginHorizontal: 48,
    paddingVertical: 32,
    borderRadius: 12,
  },

  thinButtonContainer: {
    marginHorizontal: 24,
    paddingVertical: 2,
    borderRadius: 8,
  },
});

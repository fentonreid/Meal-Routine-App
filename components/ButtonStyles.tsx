import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { useContext } from "react";
import { SettingsContext } from "@/store/SettingsContext";
import * as CT from "@/components/TextStyles";

export interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColour?: string;
  activeOpacity?: number;
  disabled?: boolean;
  onPress?: () => void;
}

export const Button_Wide = (props: Props) => {
  const { colours } = useContext(SettingsContext);

  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity ? props.activeOpacity : 0.8}
      style={[
        styles.wideButtonContainer,
        {
          backgroundColor: props.backgroundColour
            ? props.backgroundColour
            : colours["darkPrimary"],
        },
      ]}
      onPress={props.onPress}
    >
      <CT.Text_PrimaryButtonText
        style={{ color: colours["buttonText"], textAlign: "center" }}
      >
        {props.children}
      </CT.Text_PrimaryButtonText>
    </TouchableOpacity>
  );
};

export const Button_AccentThin = (props: Props) => {
  const { colours } = useContext(SettingsContext);

  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity ? props.activeOpacity : 0.8}
      style={[
        styles.thinButtonContainer,
        { backgroundColor: colours["accentButton"] },
        props.style,
      ]}
      onPress={props.onPress}
    >
      <CT.Text_SmallerButtonTitle
        style={{ color: colours["buttonText"], textAlign: "center" }}
      >
        {props.children}
      </CT.Text_SmallerButtonTitle>
    </TouchableOpacity>
  );
};

export const Button_PrimaryThin = (props: Props) => {
  const { colours } = useContext(SettingsContext);

  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity ? props.activeOpacity : 0.8}
      style={[
        styles.thinButtonContainer,
        { backgroundColor: colours["darkPrimary"] },
      ]}
      onPress={props.onPress}
    >
      <CT.Text_SmallerButtonTitle
        style={{ color: colours["buttonText"], textAlign: "center" }}
      >
        {props.children}
      </CT.Text_SmallerButtonTitle>
    </TouchableOpacity>
  );
};

export const Button_PrimaryNormal = (props: Props) => {
  const { colours } = useContext(SettingsContext);

  return (
    <TouchableOpacity
      disabled={props.disabled ? props.disabled : false}
      activeOpacity={props.activeOpacity ? props.activeOpacity : 0.8}
      style={[
        styles.normalButtonContainer,
        { backgroundColor: colours["darkPrimary"] },
      ]}
      onPress={props.onPress}
    >
      <CT.Text_SmallerButtonTitle
        style={{ color: colours["buttonText"], textAlign: "center" }}
      >
        {props.children}
      </CT.Text_SmallerButtonTitle>
    </TouchableOpacity>
  );
};

export const Button_BackgroundThin = (props: Props) => {
  const { colours } = useContext(SettingsContext);

  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity ? props.activeOpacity : 0.8}
      onPress={props.onPress}
      style={[
        styles.thinButtonContainer,
        {
          backgroundColor: colours["background"],
          borderWidth: 1,
          borderColor: colours["mainHeading"],
        },
      ]}
    >
      <CT.Text_SmallerButtonTitle
        style={{ color: colours["text"], textAlign: "center" }}
      >
        {props.children}
      </CT.Text_SmallerButtonTitle>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wideButtonContainer: {
    paddingVertical: 32,
    borderRadius: 12,
  },

  normalButtonContainer: {
    paddingVertical: 16,
    borderRadius: 12,
  },

  thinButtonContainer: {
    paddingVertical: 4,
    borderRadius: 8,
  },
});

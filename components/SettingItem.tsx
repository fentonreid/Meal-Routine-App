import { Text_ListText } from "@/components/TextStyles";
import { SettingsContext } from "@/store/SettingsContext";
import { CaretRight, IconProps } from "phosphor-react-native";
import { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, ViewStyle, Switch, Text } from "react-native";
import { SettingAction } from "../models/SettingAction";
import { SettingItem_BorderStyle } from "@/models/enums/SettingItem_BorderStyle";
import { SettingItem_ActionStyle } from "@/models/enums/SettingItem_ActionStyle";

// Setting Item Props
interface SettingItemProps {
  Icon: (iconProps: IconProps) => JSX.Element;
  Title: string;
  BorderStyle?: SettingItem_BorderStyle;
  Action: SettingAction;
}

/* Custom Setting Item Component
    -> Supports 4 different border styles: Start, End, Single, Mid (no border modification)
    -> Supports 2 different action types: chevron (router push), toggle (react native switch in-place) 
    -> Custom Icon
    -> Custom Title
*/
const SettingItem = ({ Icon, Title, BorderStyle, Action }: SettingItemProps) => {
  const { colours } = useContext(SettingsContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colours["light"] },
        BorderStyle != undefined ? getBorderStyle(BorderStyle) : {},
      ]}
    >
      <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
        <Icon weight="fill" color={colours["darkPrimary"]} size={32} />
        <Text_ListText style={{ textAlign: "center" }}>{Title}</Text_ListText>
      </View>

      {renderAction(Action)}
    </View>
  );
};

const getBorderStyle = (style: SettingItem_BorderStyle): ViewStyle => {
  switch (style) {
    case SettingItem_BorderStyle.START:
      return {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      };

    case SettingItem_BorderStyle.END:
      return {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      };

    case SettingItem_BorderStyle.SINGLE:
      return {
        borderRadius: 8,
      };
  }
};

const renderAction = (action: SettingAction) => {
  const { colours } = useContext(SettingsContext);

  switch (action.type) {
    case SettingItem_ActionStyle.CHEVRON:
      return (
        <TouchableOpacity onPress={action.OnPress}>
          <CaretRight color={colours["accentButton"]} size={32} />
        </TouchableOpacity>
      );

    case SettingItem_ActionStyle.TOGGLE:
      return (
        <Switch
          style={{ width: 32, height: 32 }}
          value={action.SwitchValue!}
          onValueChange={action.SwitchOnValueChange!}
          trackColor={{ true: colours["darkPrimary"], false: colours["secondary"] }}
          thumbColor={action.SwitchValue ? colours["primary"] : colours["background"]}
        />
      );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  borderStyling: {},
});

export default SettingItem;

import { Text_ListText } from "@/components/TextStyles";
import { SettingsContext } from "@/store/SettingsContext";
import { CheckCircle } from "phosphor-react-native";
import { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, ViewStyle, Image, ImageSourcePropType } from "react-native";
import { SettingItem_BorderStyle } from "@/models/enums/SettingItem_BorderStyle";
import Spacings from "@/constants/Spacings";

// Language Item Props
interface LanguageItemProps {
  ImagePath: ImageSourcePropType;
  Title: string;
  OnPress: () => void;
  BorderStyle?: SettingItem_BorderStyle;
  Active?: boolean;
}

/* Custom Language Item Component
    -> Supports 4 different border styles: Start, End, Single, Mid (no border modification)
    -> Supports 2 different action types: chevron (router push), toggle (react native switch in-place) 
    -> Custom Icon
    -> Custom Title
*/
const LanguageItem = ({ ImagePath, Title, BorderStyle, Active, OnPress }: LanguageItemProps) => {
  const { colours } = useContext(SettingsContext);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={OnPress}
      style={[
        styles.container,
        { backgroundColor: colours["light"] },
        BorderStyle != undefined ? getBorderStyle(BorderStyle) : {},
      ]}
    >
      <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
        <Image
          style={{ height: Spacings.mainIconSize, width: Spacings.mainIconSize, resizeMode: "contain" }}
          source={ImagePath}
        />
        <Text_ListText style={{ textAlign: "center" }}>{Title}</Text_ListText>
      </View>

      {Active && <CheckCircle color={colours["accentButton"]} size={Spacings.mainIconSize} />}
    </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    padding: 18,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default LanguageItem;

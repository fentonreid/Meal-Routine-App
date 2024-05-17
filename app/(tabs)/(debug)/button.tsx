import { StyleSheet, ScrollView } from "react-native";
import * as CT from "@/components/TextStyles";
import * as BT from "@/components/ButtonStyles";

export default function ButtonScreen() {
  return (
    <ScrollView>
      <CT.Text_Heading>Primary Button Wide</CT.Text_Heading>
      <BT.Button_Wide>Get Started</BT.Button_Wide>

      <CT.Text_Heading>Accent Button Thin</CT.Text_Heading>
      <BT.Button_AccentThin>Next</BT.Button_AccentThin>

      <CT.Text_Heading>Primary Button Thin</CT.Text_Heading>
      <BT.Button_PrimaryThin>Next</BT.Button_PrimaryThin>

      <CT.Text_Heading>Secondary Button Thin</CT.Text_Heading>
      <BT.Button_BackgroundThin activeOpacity={0.4}>Next</BT.Button_BackgroundThin>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

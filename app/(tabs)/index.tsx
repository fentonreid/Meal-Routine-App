import { StyleSheet, ScrollView } from "react-native";
import * as CT from "@/components/TextStyles";

export default function FontScreen() {
  return (
    <ScrollView>
      <CT.Text_Input>TextInput</CT.Text_Input>
      <CT.Text_TabIconText>TabIconText</CT.Text_TabIconText>
      <CT.Text_TabIconSelected>TabIconSelected</CT.Text_TabIconSelected>
      <CT.Text_ListTextBold>ListTextBold</CT.Text_ListTextBold>
      <CT.Text_MealCardTitle>MealCardTitle</CT.Text_MealCardTitle>
      <CT.Text_Text>Text</CT.Text_Text>
      <CT.Text_ListText>ListText</CT.Text_ListText>
      <CT.Text_SmallerButtonTitle>SmallerButtonTitle</CT.Text_SmallerButtonTitle>
      <CT.Text_CardHeader>CardHeader</CT.Text_CardHeader>
      <CT.Text_Heading>Heading</CT.Text_Heading>
      <CT.Text_MainHeading>MainHeading</CT.Text_MainHeading>
      <CT.Text_PrimaryButtonText>PrimaryButtonText</CT.Text_PrimaryButtonText>
      <CT.Text_SuperHeader>SuperHeader</CT.Text_SuperHeader>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

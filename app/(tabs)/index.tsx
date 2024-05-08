import { StyleSheet, View, Text } from "react-native";
import ts from "@/constants/TextStyles";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={[ts.textInput]}>TextInput</Text>
      <Text style={[ts.tabIconText]}>TabIconText</Text>
      <Text style={[ts.tabIconSelected]}>TabIconSelected</Text>
      <Text style={[ts.listTextBold]}>ListTextBold</Text>
      <Text style={[ts.mealCardTitle]}>MealCardTitle</Text>
      <Text style={[ts.text]}>Text</Text>
      <Text style={[ts.listText]}>ListText</Text>
      <Text style={[ts.smallerButtonTitle]}>SmallerButtonTitle</Text>
      <Text style={[ts.cardHeader]}>CardHeader</Text>
      <Text style={[ts.heading]}>Heading</Text>
      <Text style={[ts.mainHeading]}>MainHeading</Text>
      <Text style={[ts.primaryButtonText]}>PrimaryButtonText</Text>
      <Text style={[ts.superHeader]}>SuperHeader</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

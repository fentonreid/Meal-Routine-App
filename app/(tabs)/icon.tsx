import { StyleSheet, ScrollView } from "react-native";
import { Horse } from "phosphor-react-native";

export default function IconScreen() {
  return (
    <ScrollView>
      <Horse />
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

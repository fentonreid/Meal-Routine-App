import { StyleSheet, ScrollView } from "react-native";
import { Horse, Heart, Cube } from "phosphor-react-native";

export default function IconScreen() {
  return (
    <ScrollView>
      <Horse />
      <Heart color="#AE2983" weight="fill" size={32} />
      <Cube color="teal" weight="duotone" />
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

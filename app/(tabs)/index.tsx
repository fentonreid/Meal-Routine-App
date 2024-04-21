import { StyleSheet, View, Text } from "react-native";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vollkorn Text</Text>
      <Text style={styles.title2}>Poppins Text</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Voll",
    color: "white",
  },
  title2: {
    fontSize: 20,
    fontFamily: "Poppins",
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

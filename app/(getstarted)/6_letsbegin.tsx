import { SettingsContext } from "@/store/SettingsContext";
import { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const StackScreen6 = () => {
  const { toggleGetStartedEnabled } = useContext(SettingsContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>LET'S BEGIN</Text>
      <TouchableOpacity
        onPress={() => {
          toggleGetStartedEnabled(false);
        }}
      >
        <Text>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default StackScreen6;

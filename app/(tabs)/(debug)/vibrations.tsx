import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import * as CT from "@/components/TextStyles";
import VibrationManager from "@/managers/VibrationManager";
import * as Haptics from "expo-haptics";
import { useContext } from "react";
import { SettingsContext } from "@/store/SettingsContext";

const VibrationsScreen = () => {
  const { vibrationsEnabled } = useContext(SettingsContext);

  const vibrationManager = VibrationManager();

  return (
    <ScrollView>
      <CT.Text_MealCardTitle>Vibrations are currently: {vibrationsEnabled ? "ON" : "OFF"}</CT.Text_MealCardTitle>
      <CT.Text_Heading>Test Impact Vibrations</CT.Text_Heading>

      <View style={{ marginTop: 50 }}>
        <CT.Text_Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              vibrationManager.impact(Haptics.ImpactFeedbackStyle.Heavy);
            }}
          >
            <CT.Text_Text>Heavy</CT.Text_Text>
          </TouchableOpacity>
        </CT.Text_Text>
      </View>

      <View style={{ marginTop: 50 }}>
        <CT.Text_Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              vibrationManager.impact(Haptics.ImpactFeedbackStyle.Medium);
            }}
          >
            <CT.Text_Text>Medium</CT.Text_Text>
          </TouchableOpacity>
        </CT.Text_Text>
      </View>

      <View style={{ marginTop: 50 }}>
        <CT.Text_Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              vibrationManager.impact(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <CT.Text_Text>Light</CT.Text_Text>
          </TouchableOpacity>
        </CT.Text_Text>
      </View>

      <CT.Text_Heading>Test Notification Vibrations</CT.Text_Heading>

      <View style={{ marginTop: 50 }}>
        <CT.Text_Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              vibrationManager.notification(Haptics.NotificationFeedbackType.Success);
            }}
          >
            <CT.Text_Text>Success</CT.Text_Text>
          </TouchableOpacity>
        </CT.Text_Text>
      </View>

      <View style={{ marginTop: 50 }}>
        <CT.Text_Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              vibrationManager.notification(Haptics.NotificationFeedbackType.Warning);
            }}
          >
            <CT.Text_Text>Warning</CT.Text_Text>
          </TouchableOpacity>
        </CT.Text_Text>
      </View>

      <View style={{ marginTop: 50 }}>
        <CT.Text_Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              vibrationManager.notification(Haptics.NotificationFeedbackType.Error);
            }}
          >
            <CT.Text_Text>Error</CT.Text_Text>
          </TouchableOpacity>
        </CT.Text_Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3498db",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
  },
});

export default VibrationsScreen;

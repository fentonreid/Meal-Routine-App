import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import * as CT from "@/components/TextStyles";
import { useContext } from "react";
import { SettingsContext } from "@/store/SettingsContext";
import NotificationManager from "@/managers/NotificationManager";

const VibrationsScreen = () => {
  const { notificationEnabled } = useContext(SettingsContext);
  const notificationManager = NotificationManager();

  return (
    <ScrollView>
      <CT.Text_MealCardTitle>Notifications are currently: {notificationEnabled ? "ON" : "OFF"}</CT.Text_MealCardTitle>
      <CT.Text_Heading>Test Local Notifications</CT.Text_Heading>

      <View style={{ marginTop: 50 }}>
        <CT.Text_Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              notificationManager.notification();
            }}
          >
            <CT.Text_Text>Local Notification</CT.Text_Text>
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

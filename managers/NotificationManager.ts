import { SettingsContext } from "@/store/SettingsContext";
import { useContext } from "react";
import * as Notifications from "expo-notifications";

const NotificationManager = () => {
  const { notificationEnabled } = useContext(SettingsContext);

  const scheduleNotification = () => {
    if (!notificationEnabled) return;

    Notifications.scheduleNotificationAsync({
      content: {
        title: "Notification Test",
        body: "This the body of the test notification",
        data: { testDataProperty: "Fenton" },
      },
      trigger: { seconds: 1 },
    });
  };

  const notification = () => {
    if (notificationEnabled) {
      scheduleNotification();
    }
  };

  // Useful for when the notifications enabled property is modified
  const cancelAllNotifications = async () => {};

  return {
    notification,
    cancelAllNotifications,
  };
};

export default NotificationManager;

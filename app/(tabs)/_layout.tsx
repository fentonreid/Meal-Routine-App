import React, { useContext } from "react";
import { Tabs } from "expo-router";
import { SettingsContext } from "@/store/SettingsContext";
import { View, StyleSheet, Text } from "react-native";
import { Book, BugBeetle, DotsThreeCircle, ForkKnife, Heart, ListPlus } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { FontStyles } from "@/constants/FontStyles";

const TabBarLabel = ({ focused, label }: any) => {
  const { colours } = useContext(SettingsContext);

  return (
    <Text
      style={{
        color: focused ? colours["tabSelected"] : colours["tabUnselected"],
        fontSize: 12,
        fontFamily: focused ? "Poppins_Bold" : "Poppins",
        paddingTop: 2,
        textAlign: "center",
      }}
    >
      {label}
    </Text>
  );
};

const MainTabLayout = () => {
  const { colours } = useContext(SettingsContext);
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colours["tabSelected"],
        tabBarInactiveTintColor: colours["tabUnselected"],
        headerTitleAlign: "center",
        headerTitleStyle: { ...FontStyles.mainHeading, color: colours["mainHeading"] },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="create"
        options={{
          title: t("main_tab_create"),
          tabBarLabel: (props) => <TabBarLabel label={t("main_tab_create")} {...props} />,
          tabBarIcon: ({ color, size }) => (
            <ListPlus
              weight={color === colours["tabSelected"] ? "fill" : "regular"}
              color={color}
              size={size}
              style={{ marginTop: 6 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: t("main_tab_meals"),
          tabBarLabel: (props) => <TabBarLabel label={t("main_tab_meals")} {...props} />,
          tabBarIcon: ({ color, size }) => (
            <ForkKnife
              color={color}
              weight={color === colours["tabSelected"] ? "fill" : "regular"}
              size={size}
              style={{ marginTop: 6 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: t("main_tab_diary"),
          tabBarLabel: (props) => <TabBarLabel label={t("main_tab_diary")} {...props} />,
          tabBarIcon: ({ color, size }) => (
            <>
              <Book
                weight={color === colours["tabSelected"] ? "fill" : "regular"}
                color={color}
                size={size * 1.1}
                style={{ marginTop: 6 }}
              />
              <View style={styles.heartContainer}>
                <Heart
                  weight="fill"
                  color={color === colours["tabSelected"] ? colours["background"] : colours["tabUnselected"]}
                  size={size / 2}
                />
              </View>
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: t("main_tab_more"),
          tabBarLabel: (props) => <TabBarLabel label={t("main_tab_more")} {...props} />,
          tabBarIcon: ({ color, size }) => (
            <DotsThreeCircle
              weight={color === colours["tabSelected"] ? "fill" : "regular"}
              color={color}
              size={size * 1.15}
              style={{ marginTop: 6 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(debug)"
        options={{
          headerShown: false,
          tabBarLabel: (props) => <TabBarLabel label="DEBUG" {...props} />,
          tabBarIcon: ({ color, size }) => (
            <BugBeetle
              weight={color === colours["tabSelected"] ? "fill" : "regular"}
              color={color}
              size={size}
              style={{ marginTop: 6 }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  heartContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -4, // Adjust to center the heart vertically
    marginLeft: -5, // Adjust to center the heart horizontally
  },
});

export default MainTabLayout;

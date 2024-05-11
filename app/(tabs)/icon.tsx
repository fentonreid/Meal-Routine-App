import { StyleSheet, ScrollView, Text, View, useColorScheme } from "react-native";
import * as Icon from "phosphor-react-native";
import { COLOURS } from "@/constants/Colours";
import { useContext } from "react";
import { SettingsContext } from "@/store/SettingsContext";

const IconScreen = () => {
  const { colourTheme } = useContext(SettingsContext);
  const colours = COLOURS[colourTheme];

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Calendar Filled</Text>
        <Icon.CalendarBlank color={colours["accent"]} weight="fill" size={32} />
        <Text>calendar-blank</Text>
      </View>

      <View style={styles.container}>
        <Text>Fork Filled</Text>
        <Icon.ForkKnife color={colours["accent"]} weight="fill" size={32} />
        <Text>fork-knife</Text>
      </View>

      <View style={styles.container}>
        <Text>Note</Text>
        <Icon.NotePencil color={colours["accent"]} weight="fill" size={32} />
        <Text>note-pencil</Text>
      </View>

      <View style={styles.container}>
        <Text>Arrow left</Text>
        <Icon.ArrowLeft color={colours["accent"]} weight="regular" size={32} />
        <Text>arrow-left</Text>
      </View>

      <View style={styles.container}>
        <Text>Arrow right</Text>
        <Icon.ArrowRight color={colours["accent"]} weight="regular" size={32} />
        <Text>arrow-right</Text>
      </View>

      <View style={styles.container}>
        <Text>Profile</Text>
        <Icon.UserList color={colours["accent"]} weight="fill" size={32} />
        <Text>user-list</Text>
      </View>

      <View style={styles.container}>
        <Text>Lock</Text>
        <Icon.LockKey color={colours["accent"]} weight="fill" size={32} />
        <Text>lock-key</Text>
      </View>

      <View style={styles.container}>
        <Text>Vibration</Text>
        <Icon.Vibrate color={colours["accent"]} weight="fill" size={32} />
        <Text>vibrate</Text>
      </View>

      <View style={styles.container}>
        <Text>Bell</Text>
        <Icon.Bell color={colours["accent"]} weight="fill" size={32} />
        <Text>bell</Text>
      </View>

      <View style={styles.container}>
        <Text>Star Filled</Text>
        <Icon.Star color={colours["accent"]} weight="fill" size={32} />
        <Text>star</Text>
      </View>

      <View style={styles.container}>
        <Text>Settings Cog</Text>
        <Icon.GearSix color={colours["accent"]} weight="fill" size={32} />
        <Text>gear-six</Text>
      </View>

      <View style={styles.container}>
        <Text>Calendar Outline</Text>
        <Icon.CalendarBlank color={colours["accent"]} weight="regular" size={32} />
        <Text>calendar-blank</Text>
      </View>

      <View style={styles.container}>
        <Text>Lightning Bolt</Text>
        <Icon.Lightning color={colours["accent"]} weight="fill" size={32} />
        <Text>lightning</Text>
      </View>

      <View style={styles.container}>
        <Text>Tick Filled</Text>
        <Icon.CheckCircle color={colours["accent"]} weight="fill" size={32} />
        <Text>check-circle</Text>
      </View>

      <View style={styles.container}>
        <Text>Plus Filled</Text>
        <Icon.PlusCircle color={colours["accent"]} weight="fill" size={32} />
        <Text>plus-circle</Text>
      </View>

      <View style={styles.container}>
        <Text>Plus Outline</Text>
        <Icon.PlusCircle color={colours["accent"]} weight="regular" size={32} />
        <Text>plus-circle</Text>
      </View>

      <View style={styles.container}>
        <Text>Search List</Text>
        <Icon.ListMagnifyingGlass color={colours["accent"]} weight="regular" size={32} />
        <Text>list-magnifying-glass</Text>
      </View>

      <View style={styles.container}>
        <Text>Heart Filled</Text>
        <Icon.Heart color={colours["accent"]} weight="fill" size={32} />
        <Text>heart</Text>
      </View>

      <View style={styles.container}>
        <Text>Heart Outline</Text>
        <Icon.Heart color={colours["accent"]} weight="regular" size={32} />
        <Text>heart</Text>
      </View>

      <View style={styles.container}>
        <Text>Chevron Left</Text>
        <Icon.CaretLeft color={colours["accent"]} weight="regular" size={32} />
        <Text>caret-left</Text>
      </View>

      <View style={styles.container}>
        <Text>Chevron Right</Text>
        <Icon.CaretRight color={colours["accent"]} weight="regular" size={32} />
        <Text>caret-right</Text>
      </View>

      <View style={styles.container}>
        <Text>Filter</Text>
        <Icon.SlidersHorizontal color={colours["accent"]} weight="regular" size={32} />
        <Text>sliders-horizontal</Text>
      </View>

      <View style={styles.container}>
        <Text>Pencil Circle</Text>
        <Icon.PencilCircle color={colours["accent"]} weight="fill" size={32} />
        <Text>pencil-circle</Text>
      </View>

      <View style={styles.container}>
        <Text>Fullscreen</Text>
        <Icon.ArrowsOut color={colours["accent"]} weight="fill" size={32} />
        <Text>arrows-out</Text>
      </View>

      <View style={styles.container}>
        <Text>List 1/2</Text>
        <Icon.ListNumbers color={colours["accent"]} weight="regular" size={32} />
        <Text>list-numbers</Text>
      </View>

      <View style={styles.container}>
        <Text>Pencil on paper</Text>
        <Icon.PencilLine color={colours["accent"]} weight="fill" size={32} />
        <Text>pencil-line</Text>
      </View>

      <View style={styles.container}>
        <Text>Tick list</Text>
        <Icon.ListChecks color={colours["accent"]} weight="regular" size={32} />
        <Text>list-checks</Text>
      </View>

      <View style={styles.container}>
        <Text>Fork Outline</Text>
        <Icon.ForkKnife color={colours["accent"]} weight="regular" size={32} />
        <Text>fork-knife</Text>
      </View>

      <View style={styles.container}>
        <Text>Heart Book Outline</Text>
        <View>
          <Icon.Book color={colours["accent"]} weight="regular" size={32} />
          <View style={styles.heartContainer}>
            <Icon.Heart color={colours["accent"]} weight="fill" size={12} />
          </View>
        </View>
        <Text>heart-book-custom</Text>
      </View>

      <View style={styles.container}>
        <Text>More Circle</Text>
        <Icon.DotsThreeCircle color={colours["accent"]} weight="regular" size={32} />
        <Text>dots-three-circle</Text>
      </View>

      <View style={styles.container}>
        <Text>Share</Text>
        <Icon.ShareNetwork color={colours["accent"]} weight="regular" size={32} />
        <Text>share-network</Text>
      </View>

      <View style={styles.container}>
        <Text>Star Filled</Text>
        <Icon.Star color={colours["accent"]} weight="fill" size={32} />
        <Text>star</Text>
      </View>

      <View style={styles.container}>
        <Text>Start Outline</Text>
        <Icon.Star color={colours["accent"]} weight="regular" size={32} />
        <Text>star</Text>
      </View>

      <View style={styles.container}>
        <Text>Plus list</Text>
        <Icon.ListPlus color={colours["accent"]} weight="fill" size={32} />
        <Text>list-plus</Text>
      </View>

      <View style={styles.container}>
        <Text>Chevron Down Filled</Text>
        <Icon.CaretDown color={colours["accent"]} weight="fill" size={32} />
        <Text></Text>
      </View>

      <View style={styles.container}>
        <Text>User</Text>
        <Icon.User color={colours["accent"]} weight="fill" size={32} />
        <Text>user</Text>
      </View>

      <View style={styles.container}>
        <Text>Bar Chart</Text>
        <Icon.ChartBar color={colours["accent"]} weight="fill" size={32} />
        <Text>chart-bar</Text>
      </View>

      <View style={styles.container}>
        <Text>User Minus</Text>
        <Icon.UserCircleMinus color={colours["accent"]} weight="fill" size={32} />
        <Text>user-circle-minus</Text>
      </View>

      <View style={styles.container}>
        <Text>Radioactive</Text>
        <Icon.Radioactive color={colours["accent"]} weight="fill" size={32} />
        <Text>radioactive</Text>
      </View>

      <View style={styles.container}>
        <Text>World</Text>
        <Icon.Globe color={colours["accent"]} weight="fill" size={32} />
        <Text>globe</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 12,
    flex: 1,
    flexDirection: "row",
    gap: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  heartContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -7, // Adjust to center the heart vertically
    marginLeft: -6, // Adjust to center the heart horizontally
  },
});

export default IconScreen;

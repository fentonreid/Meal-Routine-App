import { StyleSheet, ScrollView, Text, View, useColorScheme } from "react-native";
import {
  ArrowLeft,
  ArrowRight,
  ArrowsOut,
  Bell,
  Book,
  CalendarBlank,
  CaretDown,
  CaretLeft,
  CaretRight,
  ChartBar,
  CheckCircle,
  DotsThreeCircle,
  ForkKnife,
  GearSix,
  Globe,
  Heart,
  Lightning,
  ListChecks,
  ListMagnifyingGlass,
  ListNumbers,
  ListPlus,
  Lock,
  LockKey,
  NotePencil,
  PencilCircle,
  PencilLine,
  PlusCircle,
  Radioactive,
  ShareNetwork,
  SlidersHorizontal,
  Star,
  User,
  UserCircleMinus,
  UserList,
  Vibrate,
} from "phosphor-react-native";
import { COLOURS } from "@/constants/Colours";

const IconScreen = () => {
  const colourScheme = useColorScheme();
  const colours = COLOURS[colourScheme ?? "dark"];

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Calendar Filled</Text>
        <CalendarBlank color={colours["accent"]} weight="fill" size={32} />
        <Text>calendar-blank</Text>
      </View>

      <View style={styles.container}>
        <Text>Fork Filled</Text>
        <ForkKnife color={colours["accent"]} weight="fill" size={32} />
        <Text>fork-knife</Text>
      </View>

      <View style={styles.container}>
        <Text>Note</Text>
        <NotePencil color={colours["accent"]} weight="fill" size={32} />
        <Text>note-pencil</Text>
      </View>

      <View style={styles.container}>
        <Text>Arrow left</Text>
        <ArrowLeft color={colours["accent"]} weight="regular" size={32} />
        <Text>arrow-left</Text>
      </View>

      <View style={styles.container}>
        <Text>Arrow right</Text>
        <ArrowRight color={colours["accent"]} weight="regular" size={32} />
        <Text>arrow-right</Text>
      </View>

      <View style={styles.container}>
        <Text>Profile</Text>
        <UserList color={colours["accent"]} weight="fill" size={32} />
        <Text>user-list</Text>
      </View>

      <View style={styles.container}>
        <Text>Lock</Text>
        <LockKey color={colours["accent"]} weight="fill" size={32} />
        <Text>lock-key</Text>
      </View>

      <View style={styles.container}>
        <Text>Vibration</Text>
        <Vibrate color={colours["accent"]} weight="fill" size={32} />
        <Text>vibrate</Text>
      </View>

      <View style={styles.container}>
        <Text>Bell</Text>
        <Bell color={colours["accent"]} weight="fill" size={32} />
        <Text>bell</Text>
      </View>

      <View style={styles.container}>
        <Text>Star Filled</Text>
        <Star color={colours["accent"]} weight="fill" size={32} />
        <Text>star</Text>
      </View>

      <View style={styles.container}>
        <Text>Settings Cog</Text>
        <GearSix color={colours["accent"]} weight="fill" size={32} />
        <Text>gear-six</Text>
      </View>

      <View style={styles.container}>
        <Text>Calendar Outline</Text>
        <CalendarBlank color={colours["accent"]} weight="regular" size={32} />
        <Text>calendar-blank</Text>
      </View>

      <View style={styles.container}>
        <Text>Lightning Bolt</Text>
        <Lightning color={colours["accent"]} weight="fill" size={32} />
        <Text>lightning</Text>
      </View>

      <View style={styles.container}>
        <Text>Tick Filled</Text>
        <CheckCircle color={colours["accent"]} weight="fill" size={32} />
        <Text>check-circle</Text>
      </View>

      <View style={styles.container}>
        <Text>Plus Filled</Text>
        <PlusCircle color={colours["accent"]} weight="fill" size={32} />
        <Text>plus-circle</Text>
      </View>

      <View style={styles.container}>
        <Text>Plus Outline</Text>
        <PlusCircle color={colours["accent"]} weight="regular" size={32} />
        <Text>plus-circle</Text>
      </View>

      <View style={styles.container}>
        <Text>Search List</Text>
        <ListMagnifyingGlass color={colours["accent"]} weight="regular" size={32} />
        <Text>list-magnifying-glass</Text>
      </View>

      <View style={styles.container}>
        <Text>Heart Filled</Text>
        <Heart color={colours["accent"]} weight="fill" size={32} />
        <Text>heart</Text>
      </View>

      <View style={styles.container}>
        <Text>Heart Outline</Text>
        <Heart color={colours["accent"]} weight="regular" size={32} />
        <Text>heart</Text>
      </View>

      <View style={styles.container}>
        <Text>Chevron Left</Text>
        <CaretLeft color={colours["accent"]} weight="regular" size={32} />
        <Text>caret-left</Text>
      </View>

      <View style={styles.container}>
        <Text>Chevron Right</Text>
        <CaretRight color={colours["accent"]} weight="regular" size={32} />
        <Text>caret-right</Text>
      </View>

      <View style={styles.container}>
        <Text>Filter</Text>
        <SlidersHorizontal color={colours["accent"]} weight="regular" size={32} />
        <Text>sliders-horizontal</Text>
      </View>

      <View style={styles.container}>
        <Text>Pencil Circle</Text>
        <PencilCircle color={colours["accent"]} weight="fill" size={32} />
        <Text>pencil-circle</Text>
      </View>

      <View style={styles.container}>
        <Text>Fullscreen</Text>
        <ArrowsOut color={colours["accent"]} weight="fill" size={32} />
        <Text>arrows-out</Text>
      </View>

      <View style={styles.container}>
        <Text>List 1/2</Text>
        <ListNumbers color={colours["accent"]} weight="regular" size={32} />
        <Text>list-numbers</Text>
      </View>

      <View style={styles.container}>
        <Text>Pencil on paper</Text>
        <PencilLine color={colours["accent"]} weight="fill" size={32} />
        <Text>pencil-line</Text>
      </View>

      <View style={styles.container}>
        <Text>Tick list</Text>
        <ListChecks color={colours["accent"]} weight="regular" size={32} />
        <Text>list-checks</Text>
      </View>

      <View style={styles.container}>
        <Text>Fork Outline</Text>
        <ForkKnife color={colours["accent"]} weight="regular" size={32} />
        <Text>fork-knife</Text>
      </View>

      <View style={styles.container}>
        <Text>Heart Book Outline</Text>
        <View>
          <Book color={colours["accent"]} weight="regular" size={32} />
          <View style={styles.heartContainer}>
            <Heart color={colours["accent"]} weight="fill" size={12} />
          </View>
        </View>
        <Text>heart-book-custom</Text>
      </View>

      <View style={styles.container}>
        <Text>More Circle</Text>
        <DotsThreeCircle color={colours["accent"]} weight="regular" size={32} />
        <Text>dots-three-circle</Text>
      </View>

      <View style={styles.container}>
        <Text>Share</Text>
        <ShareNetwork color={colours["accent"]} weight="regular" size={32} />
        <Text>share-network</Text>
      </View>

      <View style={styles.container}>
        <Text>Star Filled</Text>
        <Star color={colours["accent"]} weight="fill" size={32} />
        <Text>star</Text>
      </View>

      <View style={styles.container}>
        <Text>Start Outline</Text>
        <Star color={colours["accent"]} weight="regular" size={32} />
        <Text>star</Text>
      </View>

      <View style={styles.container}>
        <Text>Plus list</Text>
        <ListPlus color={colours["accent"]} weight="fill" size={32} />
        <Text>list-plus</Text>
      </View>

      <View style={styles.container}>
        <Text>Chevron Down Filled</Text>
        <CaretDown color={colours["accent"]} weight="fill" size={32} />
        <Text></Text>
      </View>

      <View style={styles.container}>
        <Text>User</Text>
        <User color={colours["accent"]} weight="fill" size={32} />
        <Text>user</Text>
      </View>

      <View style={styles.container}>
        <Text>Bar Chart</Text>
        <ChartBar color={colours["accent"]} weight="fill" size={32} />
        <Text>chart-bar</Text>
      </View>

      <View style={styles.container}>
        <Text>User Minus</Text>
        <UserCircleMinus color={colours["accent"]} weight="fill" size={32} />
        <Text>user-circle-minus</Text>
      </View>

      <View style={styles.container}>
        <Text>Radioactive</Text>
        <Radioactive color={colours["accent"]} weight="fill" size={32} />
        <Text>radioactive</Text>
      </View>

      <View style={styles.container}>
        <Text>World</Text>
        <Globe color={colours["accent"]} weight="fill" size={32} />
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

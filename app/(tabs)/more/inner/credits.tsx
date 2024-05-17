import { Text_CardHeader, Text_ListText } from "@/components/TextStyles";
import LayoutStyles from "@/constants/LayoutStyles";
import Spacings from "@/constants/Spacings";
import { ScrollView, View, Image, Dimensions } from "react-native";

const Screen = () => {
  const screenHeight = Dimensions.get("window").height;

  return (
    <ScrollView contentContainerStyle={[LayoutStyles.settingListScrollView]}>
      <View>
        <Text_CardHeader>App Design and Programming</Text_CardHeader>
        <Text_ListText style={{ paddingLeft: Spacings.mainContainerViewPaddingHalved }}>
          {"\u2B24"} Fenton Reid
        </Text_ListText>
      </View>

      <View>
        <Text_CardHeader style={{ marginTop: Spacings.betweenCardAndHeading }}>
          Graphic Design and Illustrations
        </Text_CardHeader>
        <Text_ListText style={{ paddingLeft: Spacings.mainContainerViewPaddingHalved }}>
          {"\u2B24"} Dawn McCormack
        </Text_ListText>
      </View>

      <View style={{ height: screenHeight * 4 }}>
        <Image
          source={require("@/assets/images/credits/frogWaiter.png")}
          style={{ resizeMode: "contain", alignSelf: "center", position: "absolute", bottom: 0 }}
        />
      </View>
    </ScrollView>
  );
};

export default Screen;

import { Text_CardHeader, Text_ListText, Text_ListTextBold, Text_Text } from "@/components/TextStyles";
import LayoutStyles from "@/constants/LayoutStyles";
import Spacings from "@/constants/Spacings";
import { View, ScrollView } from "react-native";

const Screen = () => {
  return (
    <ScrollView contentContainerStyle={LayoutStyles.settingListScrollView}>
      <Text_Text>Last Updated: [Date]</Text_Text>
      <View style={{ marginTop: Spacings.betweenCardAndHeading, marginBottom: Spacings.betweenCardAndHeading }}>
        <Text_CardHeader style={{ marginBottom: Spacings.betweenHeadingAndMainContent }}>
          1. Introduction
        </Text_CardHeader>
        <Text_Text>
          Welcome to [App Name]! Your privacy is important to us. This Privacy Policy explains how we collect, use, and
          protect your information when you use our meal planning app.
        </Text_Text>
      </View>
      <View style={{ marginBottom: Spacings.betweenCardAndHeading }}>
        <Text_CardHeader style={{ marginBottom: Spacings.betweenHeadingAndMainContent }}>
          2. Information We Collect
        </Text_CardHeader>
        <Text_Text>
          Since our app stores all data locally on your device, we do not collect or store any personal information on
          our servers.
        </Text_Text>
        <View
          style={{ paddingLeft: Spacings.mainContainerViewPaddingHalved, marginTop: Spacings.listItemBottomSpacing }}
        >
          <Text_ListText style={{ marginBottom: Spacings.listItemBottomSpacing }}>
            {"\u2B24"} <Text_ListTextBold>Recipes:</Text_ListTextBold> Any recipes you save or create within the app.
          </Text_ListText>
          <Text_ListText>
            {"\u2B24"} <Text_ListTextBold>User Preferences:</Text_ListTextBold> Your dietary preferences, favorite
            recipes, and other meal planning choices.
          </Text_ListText>
        </View>
      </View>
      <View style={{ marginBottom: Spacings.betweenCardAndHeading }}>
        <Text_CardHeader style={{ marginBottom: Spacings.betweenHeadingAndMainContent }}>
          3. Use of Information
        </Text_CardHeader>
        <Text_Text>
          The information stored on your device is used solely to enhance your experience with the app. Specifically, we
          use this information to:
        </Text_Text>
        <View
          style={{ paddingLeft: Spacings.mainContainerViewPaddingHalved, marginTop: Spacings.listItemBottomSpacing }}
        >
          <Text_ListText style={{ marginBottom: Spacings.listItemBottomSpacing }}>
            {"\u2B24"} Provide personalized meal recommendations.
          </Text_ListText>
          <Text_ListText style={{ marginBottom: Spacings.listItemBottomSpacing }}>
            {"\u2B24"} Allow you to save and organize recipes.
          </Text_ListText>
          <Text_ListText>{"\u2B24"} Customize the app according to your dietary preferences.</Text_ListText>
        </View>
      </View>
      <View style={{ marginBottom: Spacings.betweenCardAndHeading }}>
        <Text_CardHeader style={{ marginBottom: Spacings.betweenHeadingAndMainContent }}>
          4. Data Security
        </Text_CardHeader>
        <Text_Text>We take the security of your data seriously. Since all data is stored locally:</Text_Text>
        <View
          style={{ paddingLeft: Spacings.mainContainerViewPaddingHalved, marginTop: Spacings.listItemBottomSpacing }}
        >
          <Text_ListText style={{ marginBottom: Spacings.listItemBottomSpacing }}>
            {"\u2B24"} Your data is as secure as your device. We recommend using device-level security measures such as
            passwords, PINs, or biometric locks.
          </Text_ListText>
          <Text_ListText>
            {"\u2B24"} We do not transmit your data over the internet, ensuring that your information remains private
            and under your control.
          </Text_ListText>
        </View>
      </View>
      <View style={{ marginBottom: Spacings.betweenCardAndHeading }}>
        <Text_CardHeader style={{ marginBottom: Spacings.betweenHeadingAndMainContent }}>
          5. Data Sharing
        </Text_CardHeader>
        <Text_Text>
          We do not share your personal information with third parties. As all data is stored locally, it is never
          uploaded to our servers or any third-party services.
        </Text_Text>
      </View>
      <View style={{ marginBottom: Spacings.betweenCardAndHeading }}>
        <Text_CardHeader style={{ marginBottom: Spacings.betweenHeadingAndMainContent }}>
          6. Your Choices
        </Text_CardHeader>
        <Text_Text>You have full control over your data. You can:</Text_Text>
        <View
          style={{ paddingLeft: Spacings.mainContainerViewPaddingHalved, marginTop: Spacings.listItemBottomSpacing }}
        >
          <Text_ListText style={{ marginBottom: Spacings.listItemBottomSpacing }}>
            {"\u2B24"} Edit or delete any recipes or preferences stored within the app.
          </Text_ListText>
          <Text_ListText>
            {"\u2B24"} Uninstall the app, which will remove all locally stored data from your device.
          </Text_ListText>
        </View>
      </View>
      <View style={{ marginBottom: Spacings.betweenCardAndHeading }}>
        <Text_CardHeader style={{ marginBottom: Spacings.betweenHeadingAndMainContent }}>
          7. Changes to This Privacy Policy
        </Text_CardHeader>
        <Text_Text>
          We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last
          Updated" date at the top of this policy. We encourage you to review this policy periodically to stay informed
          about how we are protecting your information.
        </Text_Text>
      </View>
      <View style={{ marginBottom: Spacings.betweenCardAndHeading }}>
        <Text_CardHeader style={{ marginBottom: Spacings.betweenHeadingAndMainContent }}>8. Contact Us</Text_CardHeader>
        <Text_Text>
          If you have any questions or concerns about this Privacy Policy, please contact us at [Contact Information].
        </Text_Text>
      </View>
      <Text_Text>By using [App Name], you agree to the terms of this Privacy Policy.</Text_Text>
    </ScrollView>
  );
};

export default Screen;

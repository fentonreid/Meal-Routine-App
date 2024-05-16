import { useRouter } from "expo-router";
import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const MoreScreen = () => {
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity onPress={() => router.push("/more/settings/inner/language")}>
        <Text>Language</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/more/settings/inner/privacy")}>
        <Text>Privacy</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/more/settings/inner/credits")}>
        <Text>Credits</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MoreScreen;

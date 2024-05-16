import { useRouter } from "expo-router";
import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const MoreScreen = () => {
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity onPress={() => router.push("/more/language")}>
        <Text>Language</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/more/privacy")}>
        <Text>Privacy</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/more/credits")}>
        <Text>Credits</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MoreScreen;

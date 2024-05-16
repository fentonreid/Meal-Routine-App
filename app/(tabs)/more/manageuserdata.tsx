import { useRouter } from "expo-router";
import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const MoreScreen = () => {
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity onPress={() => router.push("/more/usage")}>
        <Text>Usage Statistics</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/more/reset")}>
        <Text>Reset User Preferences</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/more/delete")}>
        <Text>Delete All Data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MoreScreen;

import { useRouter } from "expo-router";
import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const MoreScreen = () => {
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity onPress={() => router.push("/more/import")}>
        <Text>Import</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/more/export")}>
        <Text>Export</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MoreScreen;

import { View, Text, StyleSheet, FlatList } from "react-native";
import { useQuery } from "@realm/react";
import { Ingredients } from "@/models/schemas/Schemas";

const Screen = () => {
  //const realm = useRealm();
  const ingredients = useQuery<Ingredients>("Ingredients");

  return (
    <View>
      <Text>Diary Screen</Text>

      <FlatList
        data={ingredients}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <Text>{`${item.name}`}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Screen;

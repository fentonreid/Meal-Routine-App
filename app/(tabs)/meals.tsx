import { View, Text, StyleSheet, FlatList } from "react-native";
import { useQuery } from "@realm/react";
import { Meals } from "@/models/schemas/Schemas";

const Screen = () => {
  const meals = useQuery<Meals>("Meals");

  return (
    <View>
      <Text>Meals Screen</Text>
      <FlatList
        data={meals}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <Text>{`${item.name} - ${item.ingredients[0].ingredient}`}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Screen;

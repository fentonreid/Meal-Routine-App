import { meals } from "@/models/schemas/Schemas";
import { RealmContext } from "@/store/RealmContext";
import { View, Text, StyleSheet, FlatList } from "react-native";

const { useRealm, useQuery } = RealmContext;

const Screen = () => {
  const meals = useQuery<meals>("meals");

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

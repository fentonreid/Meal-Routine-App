import { ingredients } from "@/models/schemas/Schemas";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ObjectId } from "bson";
import { useQuery } from "@realm/react";

const Screen = () => {
  //const realm = useRealm();
  const ingredients = useQuery<ingredients>("ingredients");

  // const populateRealm = () => {
  //   realm.write(() => {
  //     realm.create("ingredients", {
  //       _id: new ObjectId(),
  //       name: "TEST INGREDIENT",
  //       isPublic: true,
  //       shoppingCategory: new ObjectId(),
  //     });
  //   });
  // };

  return (
    <View>
      <Text>Diary Screen</Text>

      {/* <TouchableOpacity onPress={populateRealm}>
        <Text>ADD INGREDIENT</Text>
      </TouchableOpacity> */}

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

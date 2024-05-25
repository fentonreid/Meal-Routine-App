import {
  mealRoutines,
  meals,
  reviews,
  shoppingCategories,
  units,
  users,
} from "@/models/schemas/Schemas";
import { RealmContext } from "@/store/RealmContext";
import { View, Text, StyleSheet, FlatList } from "react-native";

/*
  There needs to be conditional data here that reads from the user object... will hard code to get the user with name 'Fenton Reid'
*/
const { useQuery } = RealmContext;

const Screen = () => {
  const users = useQuery<users>("users");
  console.log(users);

  return (
    <View>
      <Text>Create Screen</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <Text>{`${item.username}`}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Screen;

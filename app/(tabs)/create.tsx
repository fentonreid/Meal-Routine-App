import { users } from "@/models/schemas/Schemas";
import { View, Text, StyleSheet } from "react-native";
import { useQuery, useUser } from "@realm/react";
import { ObjectId } from "bson";

const Screen = () => {
  const user = useUser();
  console.log("USER ID IS: ", user!.id);
  const loggedInUser = useQuery<users>("users").filtered(
    "_id == $0",
    new ObjectId(user!.id)
  )[0];

  const users = useQuery<users>("users");
  console.log(users);

  const username = loggedInUser ? loggedInUser.username : "NOT FOUND";
  return (
    <View>
      <Text>Create Screen</Text>
      <Text>USER IS LOGGED IN: {username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Screen;

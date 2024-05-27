import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@realm/react";
import { Users } from "@/models/schemas/Schemas";

const Screen = () => {
  const user = useQuery<Users>("Users");
  console.log(user);

  const username = user ? user[0].username : "NOT FOUND";
  return (
    <View>
      <Text>Create Screen</Text>
      <Text>USER IS LOGGED IN: {username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Screen;

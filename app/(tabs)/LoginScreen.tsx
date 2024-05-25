import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useApp } from "@realm/react";
import { styles } from "./login";

export const LoginScreen = () => {
  const realmApp = useApp();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simple validation (for demonstration purposes)
    if (username === "" || password === "") {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    React.useCallback(() => {
      try {
      } catch (error) {}
    });

    // Handle login logic here (e.g., API call)
    Alert.alert("Login Info", `Username: ${username}, Password: ${password}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

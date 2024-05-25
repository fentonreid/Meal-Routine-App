import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

import { useApp, useUser } from "@realm/react";
import Realm from "realm";

const LoginScreen = () => {
  const realmApp = useApp();
  const user = useUser();

  const [username, setUsername] = useState("test@test.com");
  const [password, setPassword] = useState("testing");

  const handleLogin = async () => {
    const credentials = Realm.Credentials.emailPassword(username, password);

    // Simple validation (for demonstration purposes)
    if (username === "" || password === "") {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    try {
      // Try sign in
      const test = await realmApp.logIn(credentials);
      console.log("DID LOGIN WORK???", test.isLoggedIn);
    } catch (error) {
      // Try sign up
      await realmApp.emailPasswordAuth.registerUser({
        email: username,
        password: password,
      });
    }

    console.log("USER ID IS: ", user.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        textContentType="emailAddress"
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default LoginScreen;

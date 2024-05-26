import { SettingsContext } from "@/store/SettingsContext";
import { useApp } from "@realm/react";
import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import Realm from "realm";
import { StatusBar } from "expo-status-bar";

const App = () => {
  const realmApp = useApp();
  const { colourTheme } = useContext(SettingsContext);

  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState("test@test.com");
  const [password, setPassword] = useState("testing");
  const [confirmPassword, setConfirmPassword] = useState("testing");

  const handleLogin = async () => {
    const credentials = Realm.Credentials.emailPassword(username, password);

    // Simple validation (for demonstration purposes)
    if (username === "" || password === "") {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    try {
      // Try sign in
      console.log("SIGN IN: ", username, password);
      const test = await realmApp.logIn(credentials);
      console.log("DID LOGIN WORK???", test.isLoggedIn);
    } catch (error) {}
  };

  const handleSignup = async () => {
    // Simple validation (for demonstration purposes)
    if (username === "" || password === "" || confirmPassword === "") {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Password is equal to confirm password");
      return;
    }

    try {
      // Try sign in
      await realmApp.emailPasswordAuth.registerUser({
        email: username,
        password: password,
      });
      const credentials = Realm.Credentials.emailPassword(username, password);
      await realmApp.logIn(credentials);
    } catch (error) {
      console.log("Error with signup: ", error);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  const LoginForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
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
      <Text style={styles.toggleText}>
        Don't have an account?{" "}
        <Text style={styles.toggleLink} onPress={toggleView}>
          Sign Up
        </Text>
      </Text>
    </View>
  );

  const SignupForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Signup" onPress={handleSignup} />
      <Text style={styles.toggleText}>
        Already have an account?{" "}
        <Text style={styles.toggleLink} onPress={toggleView}>
          Login
        </Text>
      </Text>
    </View>
  );

  return (
    <>
      <StatusBar style={colourTheme === "dark" ? "light" : "dark"} />
      <View style={styles.container}>
        {isLoginView ? <LoginForm /> : <SignupForm />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  formContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  toggleText: {
    marginTop: 16,
  },
  toggleLink: {
    color: "blue",
  },
});

export default App;

import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { auth } from "./firebaseConfig";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // luo tunnus
  const handleSignUp = async () => {
    setError("");
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      setUser(userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };

  // kirjaudu sisään
  const handleSignIn = async () => {
    setError("");
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      setUser(userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };

  // kirjaudu ulos
  const handleSignOut = async () => {
    setError("");
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      setError(error.message);
    }
  };


  // tässä tosi "barebones" näkymä
  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.welcomeText}>Welcome, {user.email}!</Text>
          <Button title="Sign Out" onPress={handleSignOut} />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Button title="Sign Up" onPress={handleSignUp} />
          <Button title="Sign In" onPress={handleSignIn} />
        </>
      )}
    </View>
  );
};


// ja tyylit
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default AuthScreen;

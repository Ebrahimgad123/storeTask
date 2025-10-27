import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
} from "react-native";
import { useAppDispatch } from "../store";
import { setAuth } from "../store/authSlice";
import { login } from "../api/auth";
import { setItem } from "../utils/mmkv";
import { useAuthSession } from "../hook/useAuthSession";

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
   const { resetTimer } = useAuthSession();
  const handleLogin = async () => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      
      const data = await login(username.trim(), password.trim());
      const token = data.accessToken;
      const isSuperAdmin = username.trim().toLowerCase() === "emilys";

      dispatch(setAuth({ token, username, isSuperAdmin }));
      if (token) setItem("token", token);
      if (username) setItem("username", username);
      if (password) setItem("password", password);
      setItem("isSuperadmin", isSuperAdmin ? "true" : "false");

      Alert.alert("Login Successful", `Welcome ${username}`);
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "MainTabs" }],
      // });
      
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      Alert.alert(
        "Login Failed",
        err.response?.data?.message || "An error occurred during login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Store Login</Text>

      <TextInput
        placeholder="Username"
        value={username}
         onChangeText={(text) => {
          setUsername(text);
          resetTimer("Login"); 
        }}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          resetTimer("Login"); 
        }}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.btnText}>{loading ? "Loading..." : "Login"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "80%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginVertical: 8,
  },
  btn: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  btnText: { color: "white", fontWeight: "600" },
});

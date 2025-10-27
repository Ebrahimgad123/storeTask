import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { getItem } from "../utils/mmkv";

type Props = {
  visible: boolean;
  onUnlock: () => void;
};

export default function LockOverlay({ visible, onUnlock }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!visible) return;
    (async () => {
      try {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const supported = await LocalAuthentication.isEnrolledAsync();
        if (hasHardware && supported) {
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Unlock App",
            fallbackLabel: "Use Password",
            cancelLabel: "Cancel",
          });
          if (result.success) {
            onUnlock();
          } else {
            setShowPassword(true);
          }
        } else {
          setShowPassword(true);
        }
      } catch (e) {
        console.log("Biometric error:", e);
        setShowPassword(true);
      }
    })();
  }, [visible]);

  const handlePasswordUnlock = () => {
    const saved = getItem("password");
    if (password.trim() === saved) {
      setPassword("");
      setError("");
      onUnlock();
    } else {
      setError("password is incorrect. Please try again.");
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>App Locked</Text>

          {!showPassword ? (
          <Text style={styles.subText}>Try to unlock with biometrics</Text>
          ) : (
            <>
              <Text style={styles.subText}>Enter the password to unlock</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                style={styles.input}
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <TouchableOpacity style={styles.button} onPress={handlePasswordUnlock}>
                <Text style={styles.buttonText}>open</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "80%",
    padding: 25,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },
  subText: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 15,
    color: "#555",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

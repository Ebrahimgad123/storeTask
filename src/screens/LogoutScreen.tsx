import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { removeItem } from '../utils/mmkv';
import { store } from '../store';
import { logout } from '../store/authSlice';
import { queryClient } from "../utils/reactQueryClient";

const LogoutScreen = () => {
 const handleLogout = async () => {
  try {
    await queryClient.cancelQueries();
    await queryClient.clear();

    removeItem('token');
    removeItem('username');
    removeItem('isSuperadmin');
    removeItem('password');
    store.dispatch(logout());

  } catch (e) {
    Alert.alert('Logout Error', 'An error occurred during logout.');
    console.log('Logout error:', e);
  }
};

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.button}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff3b30',
  },
  buttonText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '600',
  },
});

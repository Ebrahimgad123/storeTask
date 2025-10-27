import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../utils/reactQueryClient";
import LoginScreen from "../screens/LoginScreen";
import ProductsScreen from "../screens/ProductsScreen";
import CategoryScreen from "../screens/CategoryScreen";
import LogoutScreen from "../screens/LogoutScreen";
import LockOverlay from "../components/LockOverlay";
import { useAuthSession } from "../hook/useAuthSession";
import { useAppSelector } from "../store";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#007AFF",
      tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
    }}
  >
    <Tab.Screen
      name="Products"
      component={ProductsScreen}
      options={{
        tabBarIcon: ({ color }) => <EvilIcons name="cart" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="Category"
      component={CategoryScreen}
      options={{
        tabBarIcon: ({ color }) => <EvilIcons name="tag" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="Sign Out"
      component={LogoutScreen}
      options={{
        tabBarIcon: ({ color }) => <EvilIcons name="unlock" size={24} color={color} />,
      }}
    />
  </Tab.Navigator>
);

export default function AppNavigator() {
  const { locked, resetTimer, handleUnlock } = useAuthSession();
  const token = useAppSelector((s) => s.auth.token);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Pressable onPressIn={() => resetTimer()} style={{ flex: 1 }}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!token ? (
              <Stack.Screen name="Login" component={LoginScreen} />
            ) : (
              <Stack.Screen name="MainTabs" component={MainTabs} />
            )}
          </Stack.Navigator>
        </Pressable>

        <LockOverlay visible={locked} onUnlock={handleUnlock} />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

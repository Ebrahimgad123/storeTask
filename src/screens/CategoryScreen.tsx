import React, { useState } from "react";
import {View,FlatList,RefreshControl,Text,ActivityIndicator} from "react-native";

import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../api/products";
import ProductCard from "../components/ProductCard";

const CHOSEN_CATEGORY = "smartphones";

export default function CategoryScreen() {
  const [category] = useState(CHOSEN_CATEGORY);
  const { data, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: ["category", category],
    queryFn: () => getProductsByCategory(category),
    staleTime: 0,
    refetchOnMount: true,
  });

  if (isLoading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Loading products...</Text>
      </View>
    );

  if (error)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ color: "red", fontSize: 16 }}>
          Failed to load products 
        </Text>
      </View>
    );

  const products = data || [];

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          marginVertical: 12,
          marginHorizontal: 16,
        }}
      >
        {category.toUpperCase()}
      </Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard title={item.title} thumbnail={item.thumbnail} />
        )}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        ListEmptyComponent={
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text style={{ color: "#888", fontSize: 16 }}>
              No products found.
            </Text>
          </View>
        }
      />
    </View>
  );
}

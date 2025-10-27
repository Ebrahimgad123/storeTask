import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProducts, deleteProduct } from "../api/products";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import OfflineBanner from "../components/OfflineBanner";

export interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

export default function ProductsScreen() {
  const { isSuperAdmin } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { data, isLoading, isRefetching, refetch } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        setDeletingId(id);
        const res = await deleteProduct(id);
        if (res.isDeleted) {
          queryClient.invalidateQueries({ queryKey: ["products"] });
        }
      } catch {
        console.log("Failed to delete product");
      } finally {
        setDeletingId(null);
      }
    },
    [queryClient]
  );

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        title={item.title}
        thumbnail={item.thumbnail}
        isSuperAdmin={isSuperAdmin}
        isDeleting={deletingId === item.id}
        onDelete={() => handleDelete(item.id)}
      />
    ),
    [isSuperAdmin, handleDelete, deletingId]
  );

  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  const products = useMemo(() => data || [], [data]);

  if (isLoading)
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#333" />;

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <OfflineBanner />
      <FlatList<Product>
        data={products}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No Products Found
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
        removeClippedSubviews={true}
        getItemLayout={(_, index) => ({ length: 86, offset: 86 * index, index })}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

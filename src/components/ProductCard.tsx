import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

interface Props {
  title: string;
  thumbnail: string;
  onDelete?: () => void;
  isSuperAdmin?: boolean;
  isDeleting?: boolean;
}

export default function ProductCard({
  title,
  thumbnail,
  onDelete,
  isSuperAdmin,
  isDeleting,
}: Props) {
  return (
    <View style={[styles.card, isDeleting && styles.cardDeleting]}>
      <Image
        source={{ uri: thumbnail }}
        style={[styles.image, isDeleting && { opacity: 0.5 }]}
      />
      <View style={styles.info}>
        <Text style={[styles.title, isDeleting && styles.titleDeleting]}>
          {title}
        </Text>
        {isSuperAdmin && (
          <TouchableOpacity
            onPress={onDelete}
            style={[styles.deleteBtn, isDeleting && styles.deleteBtnDisabled]}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.deleteBtnText}>Delete</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardDeleting: {
    opacity: 0.8,
    backgroundColor: "#f8f8f8",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#f0f0f0",
  },
  info: { flex: 1 },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  titleDeleting: {
    color: "#999",
  },
  deleteBtn: {
    backgroundColor: "#ff3b30",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 8,
    alignSelf: "flex-start",
    minWidth: 80,
    alignItems: "center",
  },
  deleteBtnDisabled: {
    backgroundColor: "#ffaa99",
  },
  deleteBtnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});

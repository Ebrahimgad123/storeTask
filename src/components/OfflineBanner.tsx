import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OfflineBanner() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    let unSub: any;
    try {
      const NetInfo = require('@react-native-community/netinfo');
      const sub = NetInfo.addEventListener((state: any) => {
        setIsConnected(state.isConnected);
      });
      NetInfo.fetch().then((s: any) => setIsConnected(s.isConnected));
      unSub = sub;
    } catch (e) {
      setIsConnected(true);
    }
    return () => {
      try {
        if (unSub) unSub();
      } catch (e) {}
    };
  }, []);

  if (isConnected === null || isConnected) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>You are offline</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { backgroundColor: '#ffcc00', padding: 8, alignItems: 'center' },
  text: { color: '#333', fontWeight: '700' },
});

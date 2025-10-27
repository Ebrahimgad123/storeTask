import { createMMKV } from 'react-native-mmkv';
export const storage = createMMKV();
export const getItem = (key: string) => storage.getString(key);
export const setItem = (key: string, value: string) => storage.set(key, value);
export const removeItem = (key: string) => storage.remove(key);

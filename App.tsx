import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { queryClient } from './src/utils/reactQueryClient';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { storage } from './src/utils/mmkv';

const persister = createSyncStoragePersister({
  storage: {
    getItem: (key: string) => storage.getString(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.remove(key),
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        <AppNavigator />
      </PersistQueryClientProvider>
    </Provider>
  );
}

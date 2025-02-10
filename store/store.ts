// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { filesReducer } from '@/store/slice/fileSlice';
import storage from 'redux-persist/lib/storage'; // Local storage
import { persistReducer, persistStore } from 'redux-persist';

// Persist configuration
const persistConfig = {
  key: 'root', // Key for storage
  storage, // Using localStorage (you can choose other storage options as well, e.g. sessionStorage)
};

// Wrap the filesReducer with persistReducer to enable persistence
const persistedReducer = persistReducer(persistConfig, filesReducer);

// Create the store with persisted reducer
export const store = configureStore({
  reducer: {
    files: persistedReducer, // Adding persisted reducer to store
  },
});

export const persistor = persistStore(store); // Persistor to manage rehydration

// Inferred type of the Redux state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

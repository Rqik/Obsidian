import { configureStore, Middleware } from '@reduxjs/toolkit';

import notesReducer from './notes.slice';

// Cross-tab synchronization middleware
const syncMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  // Sync notes actions across tabs
  if (action.type.startsWith('notes/')) {
    try {
      const channel = new BroadcastChannel('notes-sync');
      channel.postMessage({
        type: 'STATE_UPDATE',
        payload: action,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.warn('Cross-tab sync failed:', error);
    }
  }

  return result;
};

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['notes/loadFromStorage'],
      },
    }).concat(syncMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

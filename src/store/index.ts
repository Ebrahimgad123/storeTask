import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
// Redux store configuration
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

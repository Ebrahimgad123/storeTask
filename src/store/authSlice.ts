import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  username: string | null;
  isSuperAdmin: boolean;
}

const initialState: AuthState = {
  token: null,
  username: null,
  isSuperAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        token: string;
        username: string;
        isSuperAdmin: boolean;
      }>
    ) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.isSuperAdmin = action.payload.isSuperAdmin;
    },

    logout: (state) => {
      state.token = null;
      state.username = null;
      state.isSuperAdmin = false;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;

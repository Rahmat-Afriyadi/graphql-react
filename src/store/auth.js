import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("id", action.payload.user.id);
      localStorage.setItem("name", action.payload.user.name);
      localStorage.setItem("email", action.payload.user.email);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;

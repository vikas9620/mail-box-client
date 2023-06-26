import { createSlice } from "@reduxjs/toolkit";

const initialvalue = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  unreadCount: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialvalue,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
    },
    setToken(state, action) {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
    setUserId(state, action) {
      state.userId = action.payload.userId;
      localStorage.setItem("userId", action.payload.userId);
    },
    setUnreadCount(state, action) {
      state.unreadCount= action.payload.unreadCount
    }
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;

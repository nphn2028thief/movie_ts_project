import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/auth";
import { getMe, login, register } from "./auth_actions";

interface IState {
  userInfo: IUser | null;
}

const initialState: IState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const accessToken = action.payload.accessToken;
        localStorage.setItem("accessToken", accessToken);
      })
      .addCase(getMe.fulfilled, (state, action) => {
        const userInfo = action.payload;
        state.userInfo = userInfo;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

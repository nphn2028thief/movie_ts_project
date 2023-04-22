import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/auth";
import { getMe, login } from "./auth_actions";

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
      localStorage.removeItem("accessToken");
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const accessToken = action.payload.accessToken;
      // state.accessToken = accessToken;
      localStorage.setItem("accessToken", accessToken);
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      const userInfo = action.payload;
      // state.accessToken = localStorage.getItem("accessToken") as string;
      state.userInfo = userInfo;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

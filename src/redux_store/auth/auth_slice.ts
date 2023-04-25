import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/auth";
import { getMe, login, register } from "./auth_actions";

interface IState {
  userInfo: IUser | null;
  accessToken: string;
}

const initialState: IState = {
  userInfo: null,
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = "";
      state.userInfo = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const accessToken = action.payload.accessToken;
      state.accessToken = accessToken;
      localStorage.setItem("accessToken", accessToken);
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      const userInfo = action.payload;
      state.userInfo = userInfo;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

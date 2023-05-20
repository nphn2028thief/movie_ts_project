import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/auth";
import { changePassword, getMe, login, updateMe } from "./auth_actions";

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
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        const { message, newPassword } = action.payload;

        if (state.userInfo && newPassword) {
          state.userInfo.password = newPassword;
        }
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

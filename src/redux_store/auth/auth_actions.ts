import { createAsyncThunk } from "@reduxjs/toolkit";
import privateClient from "../../api/client/private_client";
import publicClient from "../../api/client/public_client";
import { ILoginInfo, IRegisterInfo, IUser } from "../../types/auth";

const authEndpoints = {
  register: "/auth/register",
  login: "/auth/login",
  getMe: "/auth/me",
  updateMe: "/auth/updateMe",
  changePassword: "/auth/changePassword",
  refreshToken: "/auth/refreshToken",
};

export const register = createAsyncThunk(
  "auth/register",
  async (payload: IRegisterInfo, { rejectWithValue }) => {
    try {
      const response = await publicClient.post<{ message: string }>(
        authEndpoints.register,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload: ILoginInfo, { rejectWithValue }) => {
    try {
      const response = await publicClient.post<{ accessToken: string }>(
        authEndpoints.login,
        payload
        // {
        //   signal: thunkAPI.signal,
        // }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMe = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
  try {
    const response = await privateClient.get<IUser>(authEndpoints.getMe, {
      signal: thunkAPI.signal,
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

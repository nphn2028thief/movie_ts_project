import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/http/auth_api";
import {
  ILoginInfo,
  IRegisterInfo,
  IUpdatePassword,
  IUser,
} from "../../types/auth";

export const register = createAsyncThunk(
  "auth/register",
  async (payload: IRegisterInfo, { rejectWithValue }) => {
    try {
      const response = await authApi.register(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload: ILoginInfo, { rejectWithValue }) => {
    try {
      const response = await authApi.login(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getMe = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
  try {
    const response = await authApi.getMe();
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateMe = createAsyncThunk(
  "auth/updateMe",
  async (payload: IUser, { rejectWithValue }) => {
    try {
      const response = await authApi.updateMe(payload);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (payload: IUpdatePassword, { rejectWithValue }) => {
    try {
      const response = await authApi.changePassword(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

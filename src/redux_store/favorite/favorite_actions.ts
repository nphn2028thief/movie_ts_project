import { createAsyncThunk } from "@reduxjs/toolkit";
import favoriteApi from "../../api/http/favorite_api";
import { IPayloadAddFavorite } from "../../types/favorite";

export const checkFavorite = createAsyncThunk(
  "favorite/checkFavorite",
  async (mediaId: number, { rejectWithValue }) => {
    try {
      const response = await favoriteApi.checkFavorite(mediaId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getMyFavorite = createAsyncThunk(
  "favorite/getMyFavorite",
  async (_, { rejectWithValue }) => {
    try {
      const response = await favoriteApi.getMyFavorite();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const addFavorite = createAsyncThunk(
  "favorite/addFavorite",
  async (payload: IPayloadAddFavorite, { rejectWithValue }) => {
    try {
      const response = await favoriteApi.addFavorite(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  "favorite/deleteFavorite",
  async (favoriteId: string, { rejectWithValue }) => {
    try {
      const response = await favoriteApi.deleteFavorite(favoriteId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import privateClient from "../../api/client/private_client";
import { IFavorite } from "../../types/user";

const authEndpoints = {
  getFavorites: "/favorites",
  addFavorite: "/favorites",
  deleteFavorite: "/favorite/:favoriteId",
};

export const getMyFavorites = createAsyncThunk(
  "user/getMyFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await privateClient.get<IFavorite[]>(
        authEndpoints.getFavorites
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addFavorite = createAsyncThunk("user/addFavorite", async () => {});

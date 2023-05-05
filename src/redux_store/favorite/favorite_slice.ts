import { createSlice } from "@reduxjs/toolkit";
import { IFavorite } from "../../types/favorite";
import {
  addFavorite,
  checkFavorite,
  deleteFavorite,
  getMyFavorite,
} from "./favorite_actions";
import { build } from "joi";

interface IState {
  favoriteList: IFavorite[];
  isFavorite: boolean;
}

const initialState: IState = {
  favoriteList: [],
  isFavorite: false,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    resetFavorite: (state) => {
      state.favoriteList = initialState.favoriteList;
      state.isFavorite = initialState.isFavorite;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkFavorite.fulfilled, (state, action) => {
        state.isFavorite = action.payload;
      })
      .addCase(getMyFavorite.fulfilled, (state, action) => {
        state.favoriteList = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const { message, data } = action.payload;
        state.favoriteList = [data, ...state.favoriteList];
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        const { message, favoriteId } = action.payload;
        const newFavoriteList = state.favoriteList.filter(
          (favorite) => favorite._id !== favoriteId
        );
        state.favoriteList = newFavoriteList;
      });
  },
});

export const { resetFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;

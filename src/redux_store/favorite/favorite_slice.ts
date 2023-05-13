import { createSlice } from "@reduxjs/toolkit";
import { IFavorite } from "../../types/favorite";
import {
  addFavorite,
  checkFavorite,
  deleteFavorite,
  getMyFavorite,
} from "./favorite_actions";

interface IState {
  favoriteList: IFavorite[];
  isFavorite: boolean;
  favoriteId?: string;
}

const initialState: IState = {
  favoriteList: [],
  isFavorite: false,
  favoriteId: undefined,
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
        const { message, favoriteId } = action.payload;
        state.isFavorite = message;
        favoriteId
          ? (state.favoriteId = favoriteId)
          : (state.favoriteId = initialState.favoriteId);
      })
      .addCase(getMyFavorite.fulfilled, (state, action) => {
        state.favoriteList = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const { message, data } = action.payload;
        state.favoriteList = [data, ...state.favoriteList];
        state.isFavorite = true;
        state.favoriteId = data._id;
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        const { message, favoriteId } = action.payload;
        const newFavoriteList = state.favoriteList.filter(
          (favorite) => favorite._id !== favoriteId
        );
        state.favoriteList = newFavoriteList;
        state.isFavorite = false;
        state.favoriteId = undefined;
      });
  },
});

export const { resetFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;

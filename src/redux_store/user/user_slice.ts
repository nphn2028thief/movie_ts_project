import { createSlice } from "@reduxjs/toolkit";
import { IFavorite } from "../../types/user";
import { getMyFavorites } from "./user_actions";

interface IState {
  favoriteList: IFavorite[];
}

const initialState: IState = {
  favoriteList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyFavorites.fulfilled, (state, action) => {
      state.favoriteList = action.payload;
    });
  },
});

export default userSlice.reducer;

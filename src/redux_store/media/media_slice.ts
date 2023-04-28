import { createSlice } from "@reduxjs/toolkit";
import { IGenre } from "../../types/media";
import { getGenreList, getMediaList } from "./media_action";

interface IState {
  mediaList: any[];
  genreList: IGenre[];
}

const initialState: IState = {
  mediaList: [],
  genreList: [],
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGenreList.fulfilled, (state, action) => {
      state.genreList = action.payload;
    });
    builder.addCase(getMediaList.fulfilled, (state, action) => {
      state.mediaList = action.payload;
    });
  },
});

export default mediaSlice.reducer;

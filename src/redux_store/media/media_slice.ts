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
    builder.addCase(getMediaList.fulfilled, (state, action) => {
      const { results } = action.payload;

      state.mediaList = results.slice(0, 5);
    });
    builder.addCase(getGenreList.fulfilled, (state, action) => {
      state.genreList = action.payload;
    });
  },
});

export default mediaSlice.reducer;

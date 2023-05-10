import { createSlice } from "@reduxjs/toolkit";
import { IBackdrop, ICast, IGenre } from "../../types/media";
import { getMediaDetail } from "./media_actions";

interface IState {
  mediaDetail: any;
  genreList: IGenre[];
  castList: ICast[];
  backdropList: IBackdrop[];
  numberOfSeason?: number;
}

const initialState: IState = {
  mediaDetail: {},
  genreList: [],
  castList: [],
  backdropList: [],
  numberOfSeason: undefined,
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    resetMediaDetail: (state) => {
      state.mediaDetail = initialState.mediaDetail;
      state.genreList = initialState.genreList;
      state.castList = initialState.castList;
      state.backdropList = initialState.backdropList;
      state.numberOfSeason = initialState.numberOfSeason;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMediaDetail.fulfilled, (state, action) => {
      state.mediaDetail = action.payload;
      state.genreList = action.payload.genres;
      state.castList = action.payload.credits.cast;
      state.backdropList = action.payload.image.backdrops;

      if (action.payload.number_of_seasons) {
        state.numberOfSeason = action.payload.number_of_seasons;
      }
    });
  },
});

export const { resetMediaDetail } = mediaSlice.actions;
export default mediaSlice.reducer;

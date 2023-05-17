import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IBackdrop,
  ICast,
  IGenre,
  IMediaResponse,
  IMediaResult,
} from "../../types/media";
import { getMediaDetail, getMediaList } from "./media_actions";

interface IState {
  media: {
    data: IMediaResult[];
    page: number;
    totalPages: number;
  };
  mediaDetail: any;
  genreList: IGenre[];
  castList: ICast[];
  backdropList: IBackdrop[];
  numberOfSeason?: number;
}

const initialState: IState = {
  media: {
    data: [],
    page: 1,
    totalPages: 0,
  },
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
    setPage: (state, action: PayloadAction<number>) => {
      state.media.page = action.payload;
    },
    resetMediaList: (state) => {
      state.media = initialState.media;
    },
    resetMediaDetail: (state) => {
      state.mediaDetail = initialState.mediaDetail;
      state.genreList = initialState.genreList;
      state.castList = initialState.castList;
      state.backdropList = initialState.backdropList;
      state.numberOfSeason = initialState.numberOfSeason;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMediaList.fulfilled, (state, action) => {
        const { results, page, total_pages } = action.payload;

        state.media.page = page;

        if (state.media.page !== 1) {
          state.media.data = [...state.media.data, ...results];
        } else {
          state.media.data = results;
        }

        state.media.totalPages = total_pages;
      })
      .addCase(getMediaDetail.fulfilled, (state, action) => {
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

export const { setPage, resetMediaList, resetMediaDetail } = mediaSlice.actions;
export default mediaSlice.reducer;

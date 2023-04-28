import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGenre, IGenreList, IMedia } from "../../types/media";
import publicClient from "../../api/client/public_client";

const genreEndpoints = {
  list: (mediaType: string) => `/genre/${mediaType}/list`,
};

const mediaEndpoints = {
  list: (mediaType: string, mediaCategory: string, page: number) =>
    `/${mediaType}/${mediaCategory}?page=${page}`,
  detail: (mediaType: string, mediaId: string) =>
    `/${mediaType}/detail/${mediaId}`,
  search: (mediaType: string, q: string, page: number) =>
    `/${mediaType}?query=${q}&page=${page}`,
};

export const getGenreList = createAsyncThunk(
  "media/getGenreList",
  async (payload: { mediaType: string }, { rejectWithValue }) => {
    try {
      const response = await publicClient.get<IGenreList>(
        genreEndpoints.list(payload.mediaType)
      );

      return response.data.genres;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMediaList = createAsyncThunk(
  "media/getMediaList",
  async (payload: IMedia, { rejectWithValue }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.list(
          payload.mediaType,
          payload.mediaCategory,
          payload.page
        )
      );

      return response.data.results;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

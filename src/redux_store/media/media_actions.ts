import { createAsyncThunk } from "@reduxjs/toolkit";
import mediaApi from "../../api/http/media_api";
import { IMedia, IMediaPayload, IMediaPayloadSearch } from "../../types/media";

export const getMediaList = createAsyncThunk(
  "media/getMediaList",
  async (payload: IMedia, { rejectWithValue }) => {
    try {
      const response = await mediaApi.getMediaList({
        mediaType: payload.mediaType,
        mediaCategory: payload.mediaCategory,
        page: payload.page,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getMediaDetail = createAsyncThunk(
  "media/getMediaDetail",
  async (payload: IMediaPayload, { rejectWithValue }) => {
    try {
      const response = await mediaApi.getMediaDetail(
        payload.mediaType,
        payload.mediaId
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const searchMedia = createAsyncThunk(
  "media/searchMedia",
  async (payload: IMediaPayloadSearch, { rejectWithValue }) => {
    try {
      const response = await mediaApi.searchMedia(
        payload.mediaType,
        payload.keyword,
        payload.page
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

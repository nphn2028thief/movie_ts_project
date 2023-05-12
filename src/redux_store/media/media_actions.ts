import { createAsyncThunk } from "@reduxjs/toolkit";
import mediaApi from "../../api/http/media_api";
import { IMediaPayload } from "../../types/media";

export const getMediaDetail = createAsyncThunk(
  "media/getMediaDetail",
  async (payload: IMediaPayload, { rejectWithValue }) => {
    try {
      const response = await mediaApi.getMediaDetail(
        payload.mediaType,
        payload.mediaId
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

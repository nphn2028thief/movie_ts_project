import { createAsyncThunk } from "@reduxjs/toolkit";
import mediaApi from "../../api/http/media_api";

interface IPayload {
  mediaType: string;
  mediaId: number;
}

export const getMediaDetail = createAsyncThunk(
  "media/getMediaDetail",
  async (payload: IPayload, { rejectWithValue }) => {
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

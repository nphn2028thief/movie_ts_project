import { createAsyncThunk } from "@reduxjs/toolkit";
import reviewApi from "../../api/http/review_api";
import { IMediaPayload } from "../../types/media";
import { IPayloadAddReview } from "../../types/review";

export const getReviews = createAsyncThunk(
  "review/getReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await reviewApi.getReviews();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getReviewsByMedia = createAsyncThunk(
  "review/getReviewsByMedia",
  async (payload: IMediaPayload, { rejectWithValue }) => {
    try {
      const response = await reviewApi.getReviewsByMedia(
        payload.mediaType,
        payload.mediaId
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const addReview = createAsyncThunk(
  "review/addReview",
  async (payload: IPayloadAddReview, { rejectWithValue }) => {
    try {
      const response = await reviewApi.addReview(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId: string, { rejectWithValue }) => {
    try {
      const response = await reviewApi.deleteReview(reviewId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

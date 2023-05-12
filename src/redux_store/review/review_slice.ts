import { createSlice } from "@reduxjs/toolkit";
import { IReview } from "../../types/review";
import {
  addReview,
  deleteReview,
  getReviews,
  getReviewsByMedia,
} from "./review_actions";

interface IState {
  reviewList: IReview[];
}

const initialState: IState = {
  reviewList: [],
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    resetReview: (state) => {
      state.reviewList = initialState.reviewList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.fulfilled, (state, action) => {
        state.reviewList = action.payload;
      })
      .addCase(getReviewsByMedia.fulfilled, (state, action) => {
        state.reviewList = action.payload;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        const { message, data } = action.payload;
        state.reviewList = [data, ...state.reviewList];
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        const { message, reviewId } = action.payload;
        const newReviewList = state.reviewList.filter(
          (review) => review._id !== reviewId
        );
        state.reviewList = newReviewList;
      });
  },
});

export const { resetReview } = reviewSlice.actions;
export default reviewSlice.reducer;

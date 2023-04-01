import { IReviewInput } from "../../types/review";
import privateClient from "../client/private_client";
import publicClient from "../client/public_client";

const reviewEndpoints = {
  list: "/reviews",
  add: (mediaId: string) => `/reviews/${mediaId}`,
  delete: (reviewId: string) => `/reviews/${reviewId}`,
};

const reviewApi = {
  getReviews: async () => {
    try {
      const response = await publicClient.get(reviewEndpoints.list);
      return response;
    } catch (error) {
      return error;
    }
  },

  addReview: async (reviewInput: IReviewInput) => {
    try {
      const response = await privateClient.post(
        reviewEndpoints.add(reviewInput.mediaId),
        reviewInput
      );
      return response;
    } catch (error) {
      return error;
    }
  },

  deleteReview: async (reviewId: string) => {
    try {
      const response = await privateClient.delete(
        reviewEndpoints.delete(reviewId)
      );
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default reviewApi;

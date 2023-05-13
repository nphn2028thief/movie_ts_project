import { IPayloadAddReview, IReview } from "../../types/review";
import privateClient from "../client/private_client";
import publicClient from "../client/public_client";

const reviewEndpoints = {
  list: "/reviews",
  listByMedia: (mediaType: string, mediaId: number) =>
    `/reviews/${mediaType}/${mediaId}`,
  add: "/reviews",
  delete: (reviewId: string) => `/reviews/${reviewId}`,
};

const reviewApi = {
  getReviews: () => {
    return privateClient.get<IReview[]>(reviewEndpoints.list);
  },

  getReviewsByMedia: (mediaType: string, mediaId: number) => {
    return publicClient.get<IReview[]>(
      reviewEndpoints.listByMedia(mediaType, mediaId)
    );
  },

  addReview: (payload: IPayloadAddReview) => {
    return privateClient.post<{ message: string; data: IReview }>(
      reviewEndpoints.add,
      payload
    );
  },

  deleteReview: (reviewId: string) => {
    return privateClient.delete<{ message: string; reviewId: string }>(
      reviewEndpoints.delete(reviewId)
    );
  },
};

export default reviewApi;

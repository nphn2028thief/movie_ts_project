import { IUser } from "./auth";

export interface IPayloadAddReview {
  mediaType: string;
  mediaId: number;
  mediaTitle: string;
  mediaPoster: string;
  content: string;
  createAt?: Date;
  updateAt?: Date;
}

export interface IReview extends IPayloadAddReview {
  _id: string;
  account: IUser;
}

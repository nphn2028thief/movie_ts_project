export interface IPayloadAddFavorite {
  mediaType: string;
  mediaId: number;
  mediaTitle: string;
  mediaPoster: string;
  mediaRate: number;
}

export interface IFavorite extends IPayloadAddFavorite {
  _id: string;
  accountId: string;
}

import { createSlice } from "@reduxjs/toolkit";

interface IFavorite {
  accountId: string;
  displayName: string;
  mediaType: string;
  mediaId: string;
  mediaTitle: string;
  mediaPoster: string;
  mediaRate: number;
}

interface IState {
  user: {
    firstName: string;
    lastName: string;
    image: string;
  } | null;
  accessToken: string;
  listFavorite: IFavorite[];
}

const initialState: IState = {
  user: null,
  accessToken: "",
  listFavorite: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;

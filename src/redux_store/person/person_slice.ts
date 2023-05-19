import { createSlice } from "@reduxjs/toolkit";
import {
  IPersonDetailResponse,
  IPersonMediaResponse,
} from "../../types/person";
import { getPersonDetail, getPersonMedia } from "./person_actions";

interface IState {
  personDetail: IPersonDetailResponse | null;
  personMedia: IPersonMediaResponse | null;
}

const initialState: IState = {
  personDetail: null,
  personMedia: null,
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    resetPersonState: (state) => {
      state.personDetail = initialState.personDetail;
      state.personMedia = initialState.personMedia;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getPersonDetail.fulfilled, (state, action) => {
        state.personDetail = action.payload;
      })
      .addCase(getPersonMedia.fulfilled, (state, action) => {
        state.personMedia = action.payload;
      }),
});

export const { resetPersonState } = personSlice.actions;
export default personSlice.reducer;

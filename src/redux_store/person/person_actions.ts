import { createAsyncThunk } from "@reduxjs/toolkit";
import personApi from "../../api/http/person_api";

export const getPersonDetail = createAsyncThunk(
  "person/getPersonDetail",
  async (personId: string, { rejectWithValue }) => {
    try {
      const response = await personApi.getPersonDetail(personId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getPersonMedia = createAsyncThunk(
  "person/getPersonMedia",
  async (personId: string, { rejectWithValue }) => {
    try {
      const response = await personApi.getPersonMedias(personId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

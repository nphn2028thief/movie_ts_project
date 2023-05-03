import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  appState: string;
}

const initialState: IState = {
  appState: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppState: (state, action: PayloadAction<string>) => {
      state.appState = action.payload;
    },
  },
});

export const { setAppState } = appSlice.actions;
export default appSlice.reducer;

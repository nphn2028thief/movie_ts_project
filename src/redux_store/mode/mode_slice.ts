import { PaletteMode } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  themeMode: PaletteMode;
}

const initialState: IState = {
  themeMode: "dark",
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setThemMode: (state, action: PayloadAction<PaletteMode>) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setThemMode } = modeSlice.actions;
export default modeSlice.reducer;

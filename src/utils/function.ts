import { PaletteMode } from "@mui/material";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../redux_store";
import { setThemMode } from "../redux_store/mode/mode_slice";
import { ETHEME } from "../types/theme_mode";

export const handleSwitchTheme = (
  themeMode: PaletteMode,
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  const theme = themeMode === ETHEME.dark ? ETHEME.light : ETHEME.dark;
  dispatch(setThemMode(theme));
};

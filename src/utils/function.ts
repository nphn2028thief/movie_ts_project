import { PaletteMode } from "@mui/material";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../redux_store";
import { setThemMode } from "../redux_store/mode/mode_slice";
import { themeMode as themeModeType } from "../types/theme_mode";

export const handleSwitchTheme = (
  themeMode: PaletteMode,
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  const theme =
    themeMode === themeModeType.dark ? themeModeType.light : themeModeType.dark;
  dispatch(setThemMode(theme));
};

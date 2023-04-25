import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ETYPE } from "../../types/auth";

interface IState {
  isOpen: boolean;
  type: string;
}

const initialState: IState = {
  isOpen: false,
  type: ETYPE.login,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    resetType: (state) => {
      state.type = initialState.type;
    },
  },
});

export const { setModalIsOpen, setType, resetType } = modalSlice.actions;
export default modalSlice.reducer;

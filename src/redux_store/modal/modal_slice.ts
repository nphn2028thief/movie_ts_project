import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  isOpen: boolean;
}

const initialState: IState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setModalIsOpen } = modalSlice.actions;
export default modalSlice.reducer;

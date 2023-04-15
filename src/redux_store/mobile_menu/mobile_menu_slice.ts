import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  isOpen: boolean;
}

const initialState: IState = {
  isOpen: false,
};

const mobileMenuSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpen } = mobileMenuSlice.actions;
export default mobileMenuSlice.reducer;

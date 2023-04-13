import apiSlice from "./api/api_slice";
import modalSlice from "./modal/modal_slice";
import modeSlice from "./mode/mode_slice";
import userSlice from "./user/user_slice";

const reducer = {
  apiSlice,
  userSlice,
  modeSlice,
  modalSlice,
};

export default reducer;

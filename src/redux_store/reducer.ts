import apiSlice from "./api/api_slice";
import modalSlice from "./modal/modal_slice";
import modeSlice from "./mode/mode_slice";
import userSlice from "./user/user_slice";
import mobileMenuSlice from "./mobile_menu/mobile_menu_slice";

const reducer = {
  apiSlice,
  userSlice,
  modeSlice,
  modalSlice,
  mobileMenuSlice,
};

export default reducer;

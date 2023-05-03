import apiSlice from "./api/api_slice";
import appSlice from "./app/app_slice";
import authSlice from "./auth/auth_slice";
import mobileMenuSlice from "./mobile_menu/mobile_menu_slice";
import modalSlice from "./modal/modal_slice";
import modeSlice from "./mode/mode_slice";
import userSlice from "./user/user_slice";

const reducer = {
  apiSlice,
  appSlice,
  authSlice,
  mobileMenuSlice,
  modalSlice,
  modeSlice,
  userSlice,
};

export default reducer;

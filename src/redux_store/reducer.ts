import apiSlice from "./api/api_slice";
import appSlice from "./app/app_slice";
import authSlice from "./auth/auth_slice";
import favoriteSlice from "./favorite/favorite_slice";
import mobileMenuSlice from "./mobile_menu/mobile_menu_slice";
import modalSlice from "./modal/modal_slice";
import modeSlice from "./mode/mode_slice";

const reducer = {
  apiSlice,
  appSlice,
  authSlice,
  favoriteSlice,
  mobileMenuSlice,
  modalSlice,
  modeSlice,
};

export default reducer;

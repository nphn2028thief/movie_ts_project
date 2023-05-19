import apiSlice from "./api/api_slice";
import appSlice from "./app/app_slice";
import authSlice from "./auth/auth_slice";
import favoriteSlice from "./favorite/favorite_slice";
import mediaSlice from "./media/media_slice";
import mobileMenuSlice from "./mobile_menu/mobile_menu_slice";
import modalSlice from "./modal/modal_slice";
import modeSlice from "./mode/mode_slice";
import personSlice from "./person/person_slice";
import reviewSlice from "./review/review_slice";

const reducer = {
  apiSlice,
  appSlice,
  authSlice,
  favoriteSlice,
  mediaSlice,
  mobileMenuSlice,
  modalSlice,
  modeSlice,
  personSlice,
  reviewSlice,
};

export default reducer;

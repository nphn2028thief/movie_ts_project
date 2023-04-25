import { Box } from "@mui/material";
import { useEffect } from "react";
import { useIsRequestPending } from "../hooks/use_status";
import { useAppDispatch, useAppSelector } from "../redux_store";
import { getMyFavorites } from "../redux_store/user/user_actions";
import Wrapper from "./wrapper";

export default function FavoritePage() {
  const { favoriteList } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  const isLoadingGetFavoriteList = useIsRequestPending(
    "user",
    "getMyFavorites"
  );

  useEffect(() => {
    dispatch(getMyFavorites());
  }, []);

  return (
    <Wrapper>
      <Box>Favorite Page</Box>
    </Wrapper>
  );
}

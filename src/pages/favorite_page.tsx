import { Box } from "@mui/material";
import { useEffect } from "react";
import { useIsRequestPending } from "../hooks/use_status";
import { useAppDispatch, useAppSelector } from "../redux_store";
import Wrapper from "./wrapper";
import { getMyFavorite } from "../redux_store/favorite/favorite_actions";

export default function FavoritePage() {
  const { favoriteList } = useAppSelector((state) => state.favoriteSlice);
  const dispatch = useAppDispatch();

  const isLoadingGetFavoriteList = useIsRequestPending(
    "user",
    "getMyFavorites"
  );

  // useEffect(() => {
  //   dispatch(getMyFavorite());
  // }, []);

  return (
    <Wrapper>
      <Box>Favorite Page</Box>
    </Wrapper>
  );
}

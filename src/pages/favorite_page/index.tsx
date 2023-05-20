import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import CardItem from "../../components/card_item";
import Container from "../../components/container";
import PageGrid from "../../components/page_grid";
import SkeletonLoading from "../../components/skeleton_loading";
import uiConfigs from "../../configs/ui_configs";
import { useIsRequestPending } from "../../hooks/use_status";
import { useAppDispatch, useAppSelector } from "../../redux_store";
import { getMyFavorite } from "../../redux_store/favorite/favorite_actions";
import Wrapper from "../wrapper";

export default function FavoritePage() {
  const { favoriteList } = useAppSelector((state) => state.favoriteSlice);
  const dispatch = useAppDispatch();

  const isLoading = useIsRequestPending("favorite", "getMyFavorite");

  useEffect(() => {
    dispatch(getMyFavorite());
  }, []);

  const handleRenderFavoriteList = () => {
    if (isLoading) {
      return (
        <PageGrid paddingX={0}>
          <SkeletonLoading
            length={5}
            width="auto"
            height={{
              xs: "300px",
              sm: "360px",
              lg: "400px",
            }}
          />
        </PageGrid>
      );
    }

    if (!favoriteList.length) {
      return (
        <Box width="100%" textAlign="center">
          <Typography>No data!</Typography>
        </Box>
      );
    }

    return (
      <PageGrid paddingX={0}>
        {favoriteList.map((item) => (
          <CardItem
            key={item._id}
            data={item}
            paddingTop="160%"
            mediaType={item.mediaType}
            hasDeleteButton
          />
        ))}
      </PageGrid>
    );
  };

  return (
    <Wrapper>
      <Box
        sx={{
          ...uiConfigs.style.mainContent,
          minHeight: {
            xs: "calc(100vh - 88px)",
            md: "calc(100vh - 110px)",
          },
        }}
      >
        <Container title="my favorites">{handleRenderFavoriteList()}</Container>
      </Box>
    </Wrapper>
  );
}

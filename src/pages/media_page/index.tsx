import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardItem from "../../components/card_item";
import PageGrid from "../../components/page_grid";
import PageHeaderGrid from "../../components/page_header_grid";
import SkeletonLoading from "../../components/skeleton_loading";
import TryAgainButton from "../../components/try_again_button";
import usePrevious from "../../hooks/use_previous";
import { useGetStatus } from "../../hooks/use_status";
import { useAppDispatch, useAppSelector } from "../../redux_store";
import { getMediaList } from "../../redux_store/media/media_actions";
import { resetMediaList, setPage } from "../../redux_store/media/media_slice";
import {
  IMediaHeader,
  movieCategories,
  tvCategories,
} from "../../utils/media_header";
import { toastMessage } from "../../utils/toast";
import Wrapper from "../wrapper";

export default function MediaPage() {
  const { mediaType } = useParams();

  const { media } = useAppSelector((state) => state.mediaSlice);
  const dispatch = useAppDispatch();

  const [isLoading, isError] = useGetStatus("media", "getMediaList");

  const [category, setCategory] = useState<string>(
    mediaType === "movie"
      ? movieCategories[0].category
      : tvCategories[0].category
  );

  const prevMediaType = usePrevious(String(mediaType));

  useEffect(() => {
    return () => {
      setCategory(movieCategories[0].category);
      dispatch(resetMediaList());
    };
  }, []);

  useEffect(() => {
    if (mediaType !== prevMediaType) {
      setCategory(
        mediaType === "movie"
          ? movieCategories[0].category
          : tvCategories[0].category
      );
      dispatch(setPage(1));
    }
  }, [mediaType, prevMediaType]);

  const handleGetMediaList = () => {
    dispatch(
      getMediaList({
        mediaType: String(mediaType),
        mediaCategory: category,
        page: media.page,
      })
    )
      .unwrap()
      .catch((error) =>
        toastMessage.error(error.message || "System is error!")
      );
  };

  useEffect(() => {
    handleGetMediaList();
  }, [category, media.page]);

  const onChangeCategory = (category: string) => {
    // if (category === category) {
    //   return;
    // }

    dispatch(setPage(1));
    setCategory(category);
  };

  const handleRenderHeader = () => {
    let array: IMediaHeader[] = [];

    if (mediaType === "movie") {
      array.push(...movieCategories);
    } else if (mediaType === "tv") {
      array.push(...tvCategories);
    }

    return array.map((item) => (
      <Button
        key={item.id}
        variant={category === item.category ? "contained" : "text"}
        sx={{
          color:
            category === item.category
              ? "primary.contrastText"
              : "text.primary",

          padding: "6px 16px",
        }}
        onClick={() => onChangeCategory(item.category)}
      >
        {item.name}
      </Button>
    ));
  };

  const handleRenderCardItem = () => {
    if (isLoading) {
      if (media.page === 1) {
        return (
          <SkeletonLoading
            length={10}
            width={{
              xs: "200px",
              sm: "230px",
              lg: "250px",
            }}
            height={{
              xs: "300px",
              sm: "360px",
              lg: "400px",
            }}
          />
        );
      }
    }

    if (isError) {
      return <TryAgainButton onClick={handleGetMediaList} />;
    }

    return media.data.map((item, index) => (
      <Box key={index}>
        <CardItem mediaType={String(mediaType)} data={item} paddingTop="160%" />
      </Box>
    ));
  };

  return (
    <Wrapper>
      <Stack gap={4}>
        <PageHeaderGrid>{handleRenderHeader()}</PageHeaderGrid>

        <PageGrid>{handleRenderCardItem()}</PageGrid>

        {media.data && media.page < media.totalPages && (
          <LoadingButton
            variant="outlined"
            sx={{
              width: "30%",
              alignSelf: "center",
              textTransform: "capitalize",
              mt: 3,
            }}
            onClick={() => dispatch(setPage(media.page + 1))}
            loading={isLoading}
          >
            load more
          </LoadingButton>
        )}
      </Stack>
    </Wrapper>
  );
}

import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import tmdbConfigs from "../../api/configs/tmdb_configs";
import Container from "../../components/container";
import PageGrid from "../../components/page_grid";
import SkeletonLoading from "../../components/skeleton_loading";
import uiConfigs from "../../configs/ui_configs";
import { useIsRequestPending } from "../../hooks/use_status";
import { useAppDispatch, useAppSelector } from "../../redux_store";
import {
  deleteReview,
  getReviews,
} from "../../redux_store/review/review_actions";
import Wrapper from "../wrapper";
import { toastMessage } from "../../utils/toast";

export default function ReviewPage() {
  const { reviewList } = useAppSelector((state) => state.reviewSlice);
  const dispatch = useAppDispatch();

  const isLoading = useIsRequestPending("review", "getReviews");
  const isLoadingDeleteReview = useIsRequestPending("review", "deleteReview");

  useEffect(() => {
    dispatch(getReviews());
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

    if (!reviewList.length) {
      return (
        <Box width="100%" textAlign="center">
          <Typography>No data!</Typography>
        </Box>
      );
    }

    return (
      <Stack gap={3}>
        {reviewList.map((item) => (
          <Box
            key={item._id}
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "0.2fr 1fr",
              lg: "0.1fr 1fr",
            }}
            gap={2}
          >
            <Box
              display={{
                xs: "none",
                sm: "block",
              }}
              flex="0 0 10%"
            >
              <Box
                sx={{
                  height: {
                    md: "100%",
                  },
                  paddingTop: "160%",
                  backgroundPosition: "50%",
                  backgroundSize: "cover",
                  backgroundImage: `url(${tmdbConfigs.backdropPath(
                    item.mediaPoster
                  )})`,
                  borderRadius: "8px",
                }}
              />
            </Box>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              justifyContent="space-between"
              gap={2}
              flex="0 0 90%"
            >
              <Stack gap={2}>
                <Box
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  <Typography variant="h6">{item.mediaTitle}</Typography>
                </Box>

                <Box>
                  <Typography variant="body2">
                    Reviewed:{" "}
                    {dayjs(item.createAt).format("DD-MM-YYYY hh-mm-ss")}
                  </Typography>
                </Box>

                <Box>
                  <Typography>Content: {item.content}</Typography>
                </Box>
              </Stack>

              <Box
                alignSelf="flex-start"
                width={{
                  xs: "100%",
                  sm: "fit-content",
                }}
              >
                <LoadingButton
                  variant="contained"
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "fit-content",
                    },
                    alignSelf: "center",
                    textTransform: "capitalize",
                  }}
                  onClick={() =>
                    dispatch(deleteReview(item._id))
                      .unwrap()
                      .then((data) =>
                        toastMessage.success(
                          data.message || "Delete review successfully!"
                        )
                      )
                      .catch((error) =>
                        toastMessage.error(
                          error.message || "Delete review failed!"
                        )
                      )
                  }
                  startIcon={<Delete />}
                  loading={isLoadingDeleteReview}
                >
                  delete
                </LoadingButton>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
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

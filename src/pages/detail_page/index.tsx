import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import tmdbConfigs from "../../api/configs/tmdb_configs";
import Container from "../../components/container";
import MediaSection from "../../components/media_section";
import TryAgainButton from "../../components/try_again_button";
import uiConfigs from "../../configs/ui_configs";
import { useGetStatus } from "../../hooks/use_status";
import { useAppDispatch, useAppSelector } from "../../redux_store";
import { checkFavorite } from "../../redux_store/favorite/favorite_actions";
import { getMediaDetail } from "../../redux_store/media/media_actions";
import { resetMediaDetail } from "../../redux_store/media/media_slice";
import { toastMessage } from "../../utils/toast";
import Wrapper from "../wrapper";
import BackdropSlide from "./backdrop_slide";
import BackgroundHeader from "./background_header";
import MediaInfo from "./media_info";
import Review from "./review";
import MediaIframe from "./media_iframe";

export default function DetailPage() {
  const { mediaType, mediaId } = useParams();

  const { userInfo } = useAppSelector((state) => state.authSlice);
  const { mediaDetail } = useAppSelector((state) => state.mediaSlice);
  const dispatch = useAppDispatch();

  // const isLoadingCheckFavorite = useIsRequestPending(
  //   "favorite",
  //   "checkFavorite"
  // );
  const [isLoading, isError] = useGetStatus("media", "getMediaDetail");

  useEffect(() => {
    if (!mediaType || !mediaId) return;
  }, [mediaType, mediaId]);

  useEffect(() => {
    return () => {
      dispatch(resetMediaDetail());
    };
  }, []);

  const handleTryAgain = async () => {
    dispatch(
      getMediaDetail({ mediaType: String(mediaType), mediaId: Number(mediaId) })
    )
      .unwrap()
      .then(() => {
        if (userInfo) {
          dispatch(checkFavorite(Number(mediaId)));
        }
      })
      .catch((error) => {
        toastMessage.error(error.message || "System is error!");
      });
  };

  useEffect(() => {
    handleTryAgain();
  }, [mediaType, mediaId]);

  const handleRenderMediaDetail = () => {
    if (isLoading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress size={28} thickness={6} color="error" />
        </Box>
      );
    }

    if (isError) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <TryAgainButton onClick={handleTryAgain} />
        </Box>
      );
    }

    if (!mediaDetail) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Typography>No data!</Typography>
        </Box>
      );
    }

    return (
      <Box>
        <BackgroundHeader />

        <Stack
          sx={{
            position: "relative",
            zIndex: 2,
            marginTop: {
              xs: "-12rem",
              sm: "-18rem",
              lg: "-24rem",
            },
            gap: "3rem",
          }}
        >
          {/* Media Detail Info */}
          <MediaInfo mediaType={String(mediaType)} mediaId={Number(mediaId)} />

          {/* Media Detail Videos */}
          <MediaIframe
            mediaType={String(mediaType)}
            mediaId={Number(mediaId)}
          />

          {/* Backdrops */}
          <Box sx={{ ...uiConfigs.style.mainContent, margin: "0 !important" }}>
            <Container title="backdrops">
              <BackdropSlide />
            </Container>
          </Box>

          <Review mediaType={String(mediaType)} mediaId={Number(mediaId)} />

          {/* Recommend */}
          <Box sx={{ ...uiConfigs.style.mainContent, margin: "0 !important" }}>
            <Container title="You may also like" hasButton>
              <MediaSection
                mediaType={String(mediaType)}
                mediaCategory={tmdbConfigs.mediaCategory.top_rated}
              />
            </Container>
          </Box>
        </Stack>
      </Box>
    );
  };

  return <Wrapper>{handleRenderMediaDetail()}</Wrapper>;
}

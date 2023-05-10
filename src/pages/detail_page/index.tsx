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
import { useGetStatus, useIsRequestPending } from "../../hooks/use_status";
import { useAppDispatch, useAppSelector } from "../../redux_store";
import { checkFavorite } from "../../redux_store/favorite/favorite_actions";
import { getMediaDetail } from "../../redux_store/media/media_actions";
import { resetMediaDetail } from "../../redux_store/media/media_slice";
import { toastMessage } from "../../utils/toast";
import Wrapper from "../wrapper";
import BackdropSlide from "./backdrop_slide";
import BackgroundHeader from "./background_header";
import MediaIframe from "./media_iframe";
import MediaInfo from "./media_info";
import Review from "./review";

export default function DetailPage() {
  const { mediaType, mediaId } = useParams();

  const { mediaDetail, genreList, castList, backdropList, numberOfSeason } =
    useAppSelector((state) => state.mediaSlice);
  const dispatch = useAppDispatch();

  const isLoadingCheckFavorite = useIsRequestPending(
    "favorite",
    "checkFavorite"
  );
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
        if (localStorage.getItem("accessToken")) {
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
    if (isLoadingCheckFavorite || isLoading) {
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
        <BackgroundHeader
          backgroundPath={mediaDetail.backdrop_path || mediaDetail.poster_path}
        />

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
          <MediaInfo
            backgroundPath={
              mediaDetail.poster_path || mediaDetail.backdrop_path
            }
            title={
              mediaDetail.original_title ||
              mediaDetail.title ||
              mediaDetail.original_name ||
              mediaDetail.name
            }
            rate={mediaDetail.vote_average}
            genreList={genreList}
            overview={mediaDetail.overview}
            castList={castList}
          />

          {/* Media Detail Videos */}
          <MediaIframe
            mediaType={String(mediaType)}
            mediaId={Number(mediaId)}
            numberOfSeason={numberOfSeason}
          />

          {/* Backdrops */}
          <Box sx={{ ...uiConfigs.style.mainContent, margin: "0 !important" }}>
            <Container title="backdrops">
              <BackdropSlide backdrops={backdropList} />
            </Container>
          </Box>

          <Review />

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

import {
  Box,
  CircularProgress,
  Grow,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import tmdbConfigs from "../../api/configs/tmdb_configs";
import Container from "../../components/container";
import MediaSection from "../../components/media_section";
import TryAgainButton from "../../components/try_again_button";
import uiConfigs from "../../configs/ui_configs";
import {
  useGetStatus,
  useIsRequestError,
  useIsRequestPending,
} from "../../hooks/use_status";
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
import {
  getPersonDetail,
  getPersonMedia,
} from "../../redux_store/person/person_actions";
import dayjs from "dayjs";
import PageGrid from "../../components/page_grid";
import CardItem from "../../components/card_item";

export default function DetailPage() {
  const { mediaType, mediaId } = useParams();

  const { userInfo } = useAppSelector((state) => state.authSlice);
  const { mediaDetail } = useAppSelector((state) => state.mediaSlice);
  const { personDetail, personMedia } = useAppSelector(
    (state) => state.personSlice
  );
  const dispatch = useAppDispatch();

  // const isLoadingCheckFavorite = useIsRequestPending(
  //   "favorite",
  //   "checkFavorite"
  // );
  const [isLoading, isError] = useGetStatus("media", "getMediaDetail");
  const isLoadingPerson = useIsRequestPending("person", "getPersonDetail");
  const isErrorPerson = useIsRequestError("person", "getPersonDetail");

  useEffect(() => {
    if (!mediaType || !mediaId) return;
  }, [mediaType, mediaId]);

  useEffect(() => {
    return () => {
      dispatch(resetMediaDetail());
    };
  }, []);

  const handleTryAgain = async () => {
    if (mediaType === "person") {
      dispatch(getPersonDetail(String(mediaId)))
        .unwrap()
        .then(() =>
          dispatch(getPersonMedia(String(mediaId))).catch((error) =>
            toastMessage.error(error.message || "System is error!")
          )
        );
    } else {
      dispatch(
        getMediaDetail({
          mediaType: String(mediaType),
          mediaId: Number(mediaId),
        })
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
    }
    // console.log(mediaType);
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

  const handleRenderPersonDetail = () => {
    if (isLoadingPerson) {
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

    if (isErrorPerson) {
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

    if (!personDetail) {
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
      <Stack gap="5rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Stack direction={{ xs: "column", md: "row" }} gap={3}>
          <Zoom in timeout={400}>
            <Box
              flex={{ md: "0 0 30%", lg: "0 0 20%" }}
              width={{ xs: "70%", sm: "50%", md: "auto" }}
              alignSelf={{ xs: "center", md: "auto" }}
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
                    personDetail.profile_path
                  )})`,
                  borderRadius: "30px",
                }}
              />
            </Box>
          </Zoom>

          <Grow in style={{ transformOrigin: "0 0 0" }} timeout={800}>
            <Stack
              gap={{ xs: 2, lg: 2 }}
              textAlign={{ xs: "center", md: "left" }}
            >
              <Box>
                <Typography
                  variant="h3"
                  fontSize={{ xs: "2.2rem", sm: "2.5rem", md: "3rem" }}
                >
                  {personDetail.name}
                </Typography>
              </Box>

              <Box>
                <Typography>
                  {dayjs(personDetail.birthday).format("DD / MM / YYYY")} -{" "}
                  {personDetail.place_of_birth}
                </Typography>
              </Box>

              <Box>
                <Typography fontWeight={700}>
                  {personDetail.biography}
                </Typography>
              </Box>
            </Stack>
          </Grow>
        </Stack>
        <Container title="Medias">
          <PageGrid paddingX={0}>
            {personMedia?.cast.map((item, index) => (
              <CardItem
                key={index}
                data={item}
                mediaType={item.media_type}
                paddingTop="160%"
              />
            ))}
          </PageGrid>
        </Container>
      </Stack>
    );
  };

  return (
    <Wrapper>
      {mediaType === "person"
        ? handleRenderPersonDetail()
        : handleRenderMediaDetail()}
    </Wrapper>
  );
}

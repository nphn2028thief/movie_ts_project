import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import mediaApi from "../../api/http/media_api";
import { useGetStatus, useIsRequestPending } from "../../hooks/use_status";
import { useAppDispatch } from "../../redux_store";
import {
  checkFavorite,
  deleteFavorite,
} from "../../redux_store/favorite/favorite_actions";
import { ICast, IGenre, IVideoResult } from "../../types/media";
import { toastMessage } from "../../utils/toast";
import Wrapper from "../wrapper";
import BackgroundHeader from "./background_header";
import MediaInfo from "./media_info";
import TryAgainButton from "../../components/try_again_button";

export default function DetailPage() {
  const { mediaType, mediaId } = useParams();
  const dispatch = useAppDispatch();

  const isLoading = useIsRequestPending("favorite", "checkFavorite");

  const [mediaDetail, setMediaDetail] = useState<any>({});
  const [genreList, setGenreList] = useState<IGenre[]>([]);
  const [castList, setCastList] = useState<ICast[]>([]);
  const [videoResults, setVideoResults] = useState<IVideoResult[]>([]);
  const [isLoadingMediaDetail, setIsLoadingMediaDetail] =
    useState<boolean>(false);
  const [isErrorMediaDetail, setIsErrorMediaDetail] = useState<boolean>(false);

  const handleTryAgain = async () => {
    setIsErrorMediaDetail(false);
    setIsLoadingMediaDetail(true);

    if (mediaType && mediaId) {
      try {
        const response = await mediaApi.getMediaDetail(
          mediaType,
          Number(mediaId)
        );

        setMediaDetail(response.data);
        setGenreList(response.data.genres.slice(0, 3));
        setCastList(response.data.credits.cast);
        setVideoResults(response.data.videos.results);

        if (localStorage.getItem("accessToken")) {
          dispatch(checkFavorite(Number(mediaId)));
        }
        setIsLoadingMediaDetail(false);
      } catch (error: any) {
        setIsLoadingMediaDetail(false);
        setIsErrorMediaDetail(true);
        toastMessage.error(error || "System is error!");
      }
    }
  };

  useEffect(() => {
    handleTryAgain();
  }, [mediaType, mediaId]);

  const handleFavorite = (favoriteId: string) => {
    dispatch(deleteFavorite(favoriteId));
  };

  const handleRenderMediaDetail = () => {
    if (isLoadingMediaDetail || isLoading) {
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

    if (isErrorMediaDetail) {
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

        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            marginTop: {
              xs: "-12rem",
              sm: "-18rem",
              lg: "-24rem",
            },
          }}
        >
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
        </Box>
      </Box>
    );
  };

  return <Wrapper>{handleRenderMediaDetail()}</Wrapper>;
}

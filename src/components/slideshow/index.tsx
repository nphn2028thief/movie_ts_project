import { PlayArrow } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb_configs";
import ui from "../../configs/ui";
import {
  useGetStatus,
  useIsRequestError,
  useIsRequestPending,
} from "../../hooks/use_status";
import { useAppDispatch, useAppSelector } from "../../redux_store";
import {
  getGenreList,
  getMediaList,
} from "../../redux_store/media/media_action";
import { toastMessage } from "../../utils/toast";
import Button from "../button";
import WrapperSlideshow from "./wrapper_slide_show";
import SlideshowItem from "./slideshow_item";

interface IProps {
  mediaType: string;
  mediaCategory: string;
}

export default function Slideshow(props: IProps) {
  const { mediaType, mediaCategory } = props;

  const theme = useTheme();

  const { genreList, mediaList } = useAppSelector((state) => state.mediaSlice);
  const dispatch = useAppDispatch();

  const [isLoading, isError] = useGetStatus("media", "getGenreList");
  const isLoadingGetMedia = useIsRequestPending("media", "getMediaList");
  const isErrorGetMedia = useIsRequestError("media", "getMediaList");

  const handleTryAgain = () => {
    dispatch(getGenreList({ mediaType }))
      .unwrap()
      .then(() => {
        dispatch(getMediaList({ mediaType, mediaCategory, page: 1 }))
          .unwrap()
          .catch((error) =>
            toastMessage.error(error.message || "System is error!")
          );
      })
      .catch((error) =>
        toastMessage.error(error.message || "System is error!")
      );
  };

  useEffect(() => {
    handleTryAgain();
  }, [mediaType, mediaCategory, dispatch]);

  const handleShowSlide = () => {
    if (isLoading || isLoadingGetMedia) {
      return (
        <WrapperSlideshow>
          <CircularProgress size={28} thickness={6} color="error" />
        </WrapperSlideshow>
      );
    }

    if (isError || isErrorGetMedia) {
      return (
        <WrapperSlideshow>
          <Button
            title="Try Again"
            width="fit-content"
            onClick={handleTryAgain}
          />
        </WrapperSlideshow>
      );
    }

    if (genreList.length === 0 || mediaList.length === 0) {
      return (
        <WrapperSlideshow>
          <Typography>No Data!</Typography>
        </WrapperSlideshow>
      );
    }

    return (
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        style={{ width: "100%", height: "max-content" }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={1000}
      >
        {mediaList.slice(0, 5).map((item) => (
          <SwiperSlide key={item.id}>
            {({ isActive }) => (
              <SlideshowItem data={item} isActive={isActive} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        color: "primary.contrastText",
        "&:before": {
          content: '""',
          width: "100%",
          height: "30%",
          position: "absolute",
          left: 0,
          bottom: 0,
          zIndex: 2,
          pointerEvents: "none",
          ...ui.style.gradientBackgroundImage[theme.palette.mode],
        },
      }}
    >
      {handleShowSlide()}
    </Box>
  );
}

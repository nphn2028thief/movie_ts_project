import { Box, useTheme } from "@mui/material";
import { useEffect } from "react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import ui from "../../configs/ui";
import { useIsRequestPending } from "../../hooks/use_status";
import { useAppDispatch, useAppSelector } from "../../redux_store";
import {
  getGenreList,
  getMediaList,
} from "../../redux_store/media/media_action";
import { toastMessage } from "../../utils/toast";
import tmdbConfigs from "../../api/configs/tmdb_configs";

interface IProps {
  mediaType: string;
  mediaCategory: string;
}

export default function Slide(props: IProps) {
  const { mediaType, mediaCategory } = props;

  const theme = useTheme();

  const { mediaList, genreList } = useAppSelector((state) => state.mediaSlice);
  const dispatch = useAppDispatch();

  const isLoadingGetMedia = useIsRequestPending("media", "getMediaList");
  const isLoadingGetGenre = useIsRequestPending("media", "getGenreList");

  useEffect(() => {
    dispatch(getGenreList({ mediaType }))
      .unwrap()
      .then(() => {
        dispatch(getMediaList({ mediaType, mediaCategory, page: 1 }))
          .unwrap()
          .catch((error) => toastMessage.error(error || "System is error!"));
      })
      .catch((error) => toastMessage.error(error || "System is error!"));
  }, [mediaType, mediaCategory, dispatch]);

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
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        style={{ width: "100%", height: "max-content" }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {mediaList.map((item) => (
          <SwiperSlide key={item.id}>
            <Box
              sx={{
                paddingTop: {
                  xs: "130%",
                  sm: "80%",
                  md: "60%",
                  lg: "45%",
                },
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundImage: `url(${tmdbConfigs.backdropPath(
                  item.backdrop_path || item.poster_path
                )})`,
              }}
            ></Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

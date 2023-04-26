import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb_configs";
import ui from "../../configs/ui";
import { useIsRequestPending } from "../../hooks/use_status";
import { useAppDispatch, useAppSelector } from "../../redux_store";
import {
  getGenreList,
  getMediaList,
} from "../../redux_store/media/media_action";
import { toastMessage } from "../../utils/toast";
import ModeWrapper from "../mode_wrapper";
import Button from "../button";
import { PlayArrow } from "@mui/icons-material";

interface IProps {
  mediaType: string;
  mediaCategory: string;
}

export default function Slide(props: IProps) {
  const { mediaType, mediaCategory } = props;

  const theme = useTheme();

  const { mediaList, genreList } = useAppSelector((state) => state.mediaSlice);
  const dispatch = useAppDispatch();

  const isLoadingGetGenre = useIsRequestPending("media", "getGenreList");
  const isLoadingGetMedia = useIsRequestPending("media", "getMediaList");

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
        // modules={[Autoplay]}
        style={{ width: "100%", height: "max-content" }}
        // autoplay={{ delay: 3000, disableOnInteraction: false }}
        // speed={1000}
      >
        {mediaList.slice(0, 5).map((item) => (
          <SwiperSlide key={item.id}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                left: 0,
                top: 0,
                ...ui.style.horizontalGradientBackgroundImage[
                  theme.palette.mode
                ],
              }}
            />

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
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                maxWidth: "1660px",
                margin: "auto",
                position: "absolute",
                inset: {
                  xs: "0",
                  sm: "30px",
                  md: "40px",
                  lg: "70px",
                },
                color: "text.primary",
              }}
            >
              <Stack spacing={4} width="90%">
                <Box>
                  <Typography
                    variant="h2"
                    fontSize={{ xs: "2rem", md: "2rem", lg: "3.8rem" }}
                    fontWeight={700}
                    textAlign={{
                      xs: "center",
                      sm: "left",
                    }}
                    sx={{ ...ui.style.typoLines(2) }}
                  >
                    {item.original_title || item.title}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    textAlign={{
                      xs: "center",
                      sm: "left",
                    }}
                    sx={{ ...ui.style.typoLines(3) }}
                  >
                    {item.overview}
                  </Typography>
                </Box>

                <Button
                  title="Watch Now"
                  width="fit-content"
                  icon={<PlayArrow />}
                  onClick={() => {}}
                />
              </Stack>

              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                  width: "400px",
                  paddingTop: {
                    sm: "78%",
                    md: "56%",
                    lg: "38%",
                  },
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundImage: `url(${tmdbConfigs.backdropPath(
                    item.backdrop_path || item.poster_path
                  )})`,
                  borderRadius: "30px",
                  boxShadow: "0 7px 29px 0 hsla(240, 5%, 41%, 0.2)",
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

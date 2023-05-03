import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import genreApi from "../../api/http/genre_api";
import mediaApi from "../../api/http/media_api";
import uiConfigs from "../../configs/ui_configs";
import { IGenre } from "../../types/media";
import { toastMessage } from "../../utils/toast";
import Button from "../button";
import SlideshowItem from "./slideshow_item";
import WrapperSlideshow from "./wrapper_slide_show";

interface IProps {
  mediaType: string;
  mediaCategory: string;
}

function Slideshow(props: IProps) {
  const { mediaType, mediaCategory } = props;

  const theme = useTheme();

  const [genreList, setGenreList] = useState<IGenre[]>([]);
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleTryAgain = async () => {
    setIsError(false);
    setIsLoading(true);

    genreApi
      .getGenreList(mediaType)
      .then((res) => {
        setGenreList(res.data.genres);

        mediaApi
          .getMediaList({ mediaType, mediaCategory, page: 1 })
          .then((res) => setMediaList(res.data.results))
          .catch((error) => {
            setIsError(true);
            toastMessage.error(error || "System is error!");
          })
          .finally(() => setIsLoading(false));
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        toastMessage.error(error || "System is error!");
      });
  };

  useEffect(() => {
    handleTryAgain();
  }, [mediaType, mediaCategory]);

  const handleShowSlide = () => {
    if (isLoading) {
      return (
        <WrapperSlideshow>
          <CircularProgress size={28} thickness={6} color="error" />
        </WrapperSlideshow>
      );
    }

    if (isError) {
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

    if (!genreList || !mediaList) {
      return (
        <WrapperSlideshow>
          <Typography>No data!</Typography>
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
        {mediaList?.slice(0, 5).map((item) => (
          <SwiperSlide key={item.id}>
            {({ isActive }) => (
              <SlideshowItem
                mediaItem={item}
                genreList={genreList}
                isActive={isActive}
              />
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
          ...uiConfigs.style.gradientBackgroundImage[theme.palette.mode],
        },
      }}
    >
      {handleShowSlide()}
    </Box>
  );
}

export default memo(Slideshow);

import { Box, CircularProgress, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import publicClient from "../../api/client/public_client";
import mediaApi from "../../api/http/media_api";
import ui from "../../configs/ui";
import { IGenre, IGenreList } from "../../types/media";
import { genreEndpoints } from "../../utils/endpoint";
import { toastMessage } from "../../utils/toast";
import Button from "../button";
import SlideshowItem from "./slideshow_item";
import WrapperSlideshow from "./wrapper_slide_show";

interface IProps {
  mediaType: string;
  mediaCategory: string;
}

export default function Slideshow(props: IProps) {
  const { mediaType, mediaCategory } = props;

  const theme = useTheme();

  const [genreList, setGenreList] = useState<IGenre[]>([]);
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [isLoadingGetGenre, setIsLoadingGetGenre] = useState<boolean>(false);
  const [isLoadingGetMedia, setIsLoadingGetMedia] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleTryAgain = () => {
    setIsError(false);
    setIsLoadingGetGenre(true);

    const getGenreList = async (mediaType: string) => {
      try {
        const response = await publicClient.get<IGenreList>(
          genreEndpoints.list(mediaType)
        );

        return response.data.genres;
      } catch (error: any) {
        setIsError(true);
        return error;
      }
    };

    getGenreList(mediaType)
      .then((data) => {
        setGenreList(data);
        setIsLoadingGetMedia(true);

        mediaApi
          .getMediaList({ mediaType, mediaCategory, page: 1 })
          .then((data) => {
            setMediaList(data);
            setIsLoadingGetMedia(false);
          })
          .catch((error) => {
            toastMessage.error(error.message || "System is error!");
            setIsLoadingGetMedia(false);
          });

        setIsLoadingGetGenre(false);
      })
      .catch((error) => {
        toastMessage.error(error.message || "System is error!");
        setIsLoadingGetGenre(false);
      });
  };

  useEffect(() => {
    handleTryAgain();
  }, [mediaType, mediaCategory]);

  useEffect(() => {
    console.log(isError);
  }, []);

  const handleShowSlide = () => {
    if (isLoadingGetGenre || isLoadingGetMedia) {
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

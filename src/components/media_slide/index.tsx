import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch, useAppSelector } from "../../redux_store";
import { getMediaList } from "../../redux_store/media/media_action";
import { toastMessage } from "../../utils/toast";
import MediaItem from "./media_item";
import mediaApi from "../../api/http/media_api";

interface IProps {
  mediaType: string;
  mediaCategory: string;
}

export default function MediaSlide(props: IProps) {
  const { mediaType, mediaCategory } = props;

  const [mediaList, setMediaList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    mediaApi
      .getMediaList({ mediaType, mediaCategory, page: 1 })
      .then((data) => {
        setMediaList(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        toastMessage.error(error.message || "System is Error!");
        setIsLoading(false);
      });
  }, [mediaType, mediaCategory]);

  const handleShowMediaSlide = () => {
    // if (isLoading) {
    //   return (
    //   )
    // }
  };

  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: {
            xs: "50%",
            sm: "35%",
            md: "25%",
            lg: "20%",
          },
        },
      }}
    >
      <Swiper
        slidesPerView="auto"
        spaceBetween={12}
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {mediaList.map((item) => (
          <SwiperSlide key={item.id}>
            <MediaItem data={item} mediaType={mediaType} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

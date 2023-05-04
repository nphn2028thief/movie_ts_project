import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import mediaApi from "../../../api/http/media_api";
import CardItem from "../../../components/card_item";
import { toastMessage } from "../../../utils/toast";

interface IProps {
  mediaType: string;
  mediaCategory: string;
}

export default function MediaSection(props: IProps) {
  const { mediaType, mediaCategory } = props;

  const [mediaList, setMediaList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleTryAgain = () => {
    setIsError(false);
    setIsLoading(true);

    mediaApi
      .getMediaList({ mediaType, mediaCategory, page: 1 })
      .then((res) => setMediaList(res.data.results))
      .catch((error) => {
        setIsError(true);
        toastMessage.error(error || "System is Error!");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    handleTryAgain();
  }, [mediaType, mediaCategory]);

  const handleShowMediaSlide = () => {
    if (isLoading) {
      return (
        <Box
          display="flex"
          height={{ xs: 300, sm: 400 }}
          justifyContent="center"
          alignItems="center"
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
          height={200}
        >
          <Button sx={{ width: "fit-content" }} onClick={handleTryAgain}>
            Try Again
          </Button>
        </Box>
      );
    }

    if (!mediaList) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={{ xs: 300, sm: 400 }}
        >
          <Typography>No data!</Typography>
        </Box>
      );
    }

    return (
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={12}
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {mediaList.map((item) => (
          <SwiperSlide key={item.id}>
            <CardItem data={item} mediaType={mediaType} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
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
      {handleShowMediaSlide()}
    </Box>
  );
}
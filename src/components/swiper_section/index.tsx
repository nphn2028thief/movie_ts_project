import { Swiper, SwiperSlide } from "swiper/react";
import CardItem from "../card_item";
import { Box, Typography } from "@mui/material";

interface IProps {
  data: any[];
  mediaType: string;
  paddingTop: string;
}

export default function SwiperSection(props: IProps) {
  const { data, mediaType, paddingTop } = props;

  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={12}
      grabCursor={true}
      style={{ width: "100%", height: "max-content" }}
      speed={1000}
    >
      {data ? (
        data.map((item) => (
          <SwiperSlide key={item.id}>
            <CardItem
              mediaType={mediaType}
              data={item}
              paddingTop={paddingTop}
            />
          </SwiperSlide>
        ))
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Typography>System is error!</Typography>
        </Box>
      )}
    </Swiper>
  );
}

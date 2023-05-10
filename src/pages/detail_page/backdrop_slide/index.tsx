import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../../api/configs/tmdb_configs";
import { IBackdrop } from "../../../types/media";
import NavigationSwiper from "./navigation_swiper";

interface IProps {
  backdrops: IBackdrop[];
}

export default function BackdropSlide(props: IProps) {
  const { backdrops } = props;

  return (
    <NavigationSwiper>
      {backdrops.slice(0, 10).map((backdrop, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              paddingTop: "60%",
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundImage: `url(${tmdbConfigs.backdropPath(
                backdrop.file_path
              )})`,
            }}
          />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
}

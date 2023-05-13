import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../../api/configs/tmdb_configs";
import { useAppSelector } from "../../../redux_store";
import NavigationSwiper from "./navigation_swiper";

export default function BackdropSlide() {
  const { backdropList } = useAppSelector((state) => state.mediaSlice);

  return (
    <NavigationSwiper>
      {backdropList.slice(0, 10).map((backdrop, index) => (
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

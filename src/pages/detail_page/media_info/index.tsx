import { Box, Chip, Grow, Stack, Typography, Zoom } from "@mui/material";
import React from "react";
import uiConfigs from "../../../configs/ui_configs";
import tmdbConfigs from "../../../api/configs/tmdb_configs";
import CircularRate from "../../../components/circular_rate";
import { LoadingButton } from "@mui/lab";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import Container from "../../../components/container";
import { IGenre } from "../../../types/media";
import { useAppDispatch, useAppSelector } from "../../../redux_store";
import { ICast } from "../../../types/media";
import { Swiper, SwiperSlide } from "swiper/react";
import CardItem from "../../../components/card_item";
import {
  addFavorite,
  deleteFavorite,
} from "../../../redux_store/favorite/favorite_actions";
import { setModalIsOpen } from "../../../redux_store/modal/modal_slice";
import {
  useIsRequestError,
  useIsRequestPending,
} from "../../../hooks/use_status";

interface IProps {
  backgroundPath: string;
  title: string;
  rate?: number;
  genreList?: IGenre[];
  overview: string;
  castList?: ICast[];
}

export default function MediaInfo(props: IProps) {
  const { backgroundPath, title, rate, genreList, overview, castList } = props;

  const { userInfo } = useAppSelector((state) => state.authSlice);
  const { isFavorite } = useAppSelector((state) => state.favoriteSlice);
  const dispatch = useAppDispatch();

  const isLoadingAddFavorite = useIsRequestPending("favorite", "addFavorite");
  const isLoadingDeleteFavorite = useIsRequestPending(
    "favorite",
    "addFavorite"
  );
  const isErrorAddFavorite = useIsRequestError("favorite", "deleteFavorite");
  const isErrorDeleteFavorite = useIsRequestError("favorite", "deleteFavorite");

  const handleFavorite = (favoriteId: string) => {
    if (userInfo) {
      if (isFavorite) {
        // Do Something ...
        // dispatch(addFavorite())
      } else {
        dispatch(deleteFavorite(favoriteId));
      }
    } else {
      dispatch(setModalIsOpen(true));
    }
  };

  const handleRenderCast = () => {
    if (!castList?.length) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={220}
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
        speed={1000}
      >
        {castList.map((item) => (
          <SwiperSlide key={item.id}>
            <CardItem mediaType="people" data={item} paddingTop="120%" />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  return (
    <Stack
      sx={{
        color: "text.primary",
        ...uiConfigs.style.mainContent,
        margin: {
          xs: "none",
          md: "auto",
        },
        zIndex: 2,
      }}
    >
      <Stack direction={{ sm: "column", md: "row" }} gap={4}>
        <Zoom in timeout={1000}>
          <Box
            flex={{ md: "0 0 30%" }}
            width={{ xs: "70%", sm: "50%", md: "auto" }}
            alignSelf={{ xs: "center", md: "auto" }}
          >
            <Box
              sx={{
                height: {
                  md: "100%",
                },
                paddingTop: "150%",
                backgroundPosition: "50%",
                backgroundSize: "cover",
                backgroundImage: `url(${tmdbConfigs.backdropPath(
                  backgroundPath
                )})`,
                borderRadius: "30px",
              }}
            />
          </Box>
        </Zoom>
        <Grow in style={{ transformOrigin: "0 0 0" }} timeout={1500}>
          <Stack
            justifyContent={{ lg: "space-between" }}
            gap={{ xs: 2, lg: "normal normal" }}
            textAlign={{ xs: "center", md: "left" }}
          >
            <Box>
              <Typography
                variant="h3"
                fontSize={{ xs: "2.2rem", sm: "2.5rem", md: "3rem" }}
              >
                {title}
              </Typography>
            </Box>

            <Stack
              direction="row"
              gap={2}
              justifyContent={{ xs: "center", md: "left" }}
              alignItems="center"
            >
              {rate && <CircularRate value={rate} />}

              {genreList?.slice(0, 3).map((genre: IGenre) => (
                <Chip
                  key={genre.id}
                  color="primary"
                  label={genre && genre.name}
                />
              ))}
            </Stack>

            <Box>
              <Typography fontWeight={700}>{overview}</Typography>
            </Box>

            <LoadingButton
              variant="text"
              sx={{
                width: {
                  xs: "100%",
                  md: "max-content",
                },
                justifyContent: {
                  xs: "center",
                  md: "flex-start",
                },
                paddingLeft: 0,
                "& .MuiButton-startIcon": {
                  marginX: 0,
                },
              }}
              size="large"
              startIcon={isFavorite ? <Favorite /> : <FavoriteBorderOutlined />}
              // onClick={handleFavorite}
            />

            <Container title="Cast">
              <Box
                sx={{
                  "& .swiper-slide": {
                    width: {
                      xs: "30%",
                      sm: "25%",
                      lg: "20%",
                    },
                  },
                }}
              >
                {handleRenderCast()}
              </Box>
            </Container>
          </Stack>
        </Grow>
      </Stack>
    </Stack>
  );
}

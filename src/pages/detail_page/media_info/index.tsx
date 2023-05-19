import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Chip, Grow, Stack, Typography, Zoom } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../../api/configs/tmdb_configs";
import CardItem from "../../../components/card_item";
import CircularRate from "../../../components/circular_rate";
import Container from "../../../components/container";
import uiConfigs from "../../../configs/ui_configs";
import { useIsRequestPending } from "../../../hooks/use_status";
import { useAppDispatch, useAppSelector } from "../../../redux_store";
import {
  addFavorite,
  checkFavorite,
  deleteFavorite,
} from "../../../redux_store/favorite/favorite_actions";
import { setModalIsOpen } from "../../../redux_store/modal/modal_slice";
import { IGenre } from "../../../types/media";
import { toastMessage } from "../../../utils/toast";

interface IProps {
  mediaType: string;
  mediaId: number;
}

export default function MediaInfo(props: IProps) {
  const { mediaType, mediaId } = props;

  const { userInfo } = useAppSelector((state) => state.authSlice);
  const { mediaDetail, genreList, castList } = useAppSelector(
    (state) => state.mediaSlice
  );
  const { isFavorite, favoriteId } = useAppSelector(
    (state) => state.favoriteSlice
  );
  const dispatch = useAppDispatch();

  const isLoadingAddFavorite = useIsRequestPending("favorite", "addFavorite");
  const isLoadingDeleteFavorite = useIsRequestPending(
    "favorite",
    "deleteFavorite"
  );
  const isLoadingCheckFavorite = useIsRequestPending(
    "favorite",
    "checkFavorite"
  );

  const handleFavorite = (favoriteId?: string) => {
    if (userInfo) {
      if (!isFavorite && favoriteId === undefined) {
        // Do Something ...
        dispatch(
          addFavorite({
            mediaType,
            mediaId,
            mediaTitle:
              mediaDetail.original_title ||
              mediaDetail.title ||
              mediaDetail.original_name ||
              mediaDetail.name,
            mediaPoster: mediaDetail.poster_path || mediaDetail.backdrop_path,
            mediaRate: mediaDetail.vote_average,
          })
        )
          .unwrap()
          .then((res) =>
            toastMessage.success(
              res.message || "Add to favorite list successfully"
            )
          )
          .catch((error) =>
            toastMessage.error(error.message || "System is error!")
          );
      } else if (isFavorite) {
        favoriteId &&
          dispatch(deleteFavorite(favoriteId))
            .unwrap()
            .then(() => dispatch(checkFavorite(mediaId)))
            .catch((error) =>
              toastMessage.error(error.message || "System is error!")
            );
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
      <Stack direction={{ xs: "column", md: "row" }} gap={4}>
        <Zoom in timeout={400}>
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
                  mediaDetail.poster_path || mediaDetail.backdrop_path
                )})`,
                borderRadius: "30px",
              }}
            />
          </Box>
        </Zoom>
        <Grow in style={{ transformOrigin: "0 0 0" }} timeout={800}>
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
                {mediaDetail.original_title ||
                  mediaDetail.title ||
                  mediaDetail.original_name ||
                  mediaDetail.name}
              </Typography>
            </Box>

            <Stack
              direction="row"
              gap={2}
              justifyContent={{ xs: "center", md: "left" }}
              alignItems="center"
            >
              {mediaDetail.vote_average && (
                <CircularRate value={mediaDetail.vote_average} />
              )}

              {genreList?.slice(0, 3).map((genre: IGenre) => (
                <Chip
                  key={genre.id}
                  color="primary"
                  label={genre && genre.name}
                />
              ))}
            </Stack>

            <Box>
              <Typography fontWeight={700}>{mediaDetail.overview}</Typography>
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
              loading={
                isLoadingAddFavorite || isLoadingDeleteFavorite ? true : false
              }
              onClick={() => handleFavorite(favoriteId)}
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

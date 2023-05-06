import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Wrapper from "../wrapper";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import mediaApi from "../../api/http/media_api";
import { useParams } from "react-router-dom";
import { toastMessage } from "../../utils/toast";
import favoriteApi from "../../api/http/favorite_api";
import { useAppDispatch, useAppSelector } from "../../redux_store";
import {
  checkFavorite,
  deleteFavorite,
} from "../../redux_store/favorite/favorite_actions";
import { useGetStatus } from "../../hooks/use_status";
import { ICast, IGenre } from "../../types/media";
import uiConfigs from "../../configs/ui_configs";
import tmdbConfigs from "../../api/configs/tmdb_configs";
import CircularRate from "../../components/circular_rate";
import { LoadingButton } from "@mui/lab";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import Container from "../../components/container";
import SwiperSection from "../../components/swiper_section";
import { Swiper, SwiperSlide } from "swiper/react";
import CardItem from "../../components/card_item";
import MediaSection from "../home_page/media_section";
import BackgroundHeader from "./background_header";

export default function DetailPage() {
  const { mediaType, mediaId } = useParams();

  const theme = useTheme();

  const { isFavorite } = useAppSelector((state) => state.favoriteSlice);
  const dispatch = useAppDispatch();

  const [isLoading, isError] = useGetStatus("favorite", "checkFavorite");

  const [mediaDetail, setMediaDetail] = useState<any>({});
  const [genreList, setGenreList] = useState<IGenre[]>([]);
  const [castList, setCastList] = useState<ICast[]>([]);
  const [isLoadingMediaDetail, setIsLoadingMediaDetail] =
    useState<boolean>(false);
  const [isErrorMediaDetail, setIsErrorMediaDetail] = useState<boolean>(false);

  const handleTryAgain = () => {
    setIsErrorMediaDetail(false);
    setIsLoadingMediaDetail(true);
    if (mediaType && mediaId) {
      mediaApi
        .getMediaDetail(mediaType, Number(mediaId))
        .then((res) => {
          setMediaDetail(res.data);
          setGenreList(res.data.genres.slice(0, 3));
          setCastList(res.data.credits.cast);

          if (localStorage.getItem("accessToken")) {
            dispatch(checkFavorite(Number(mediaId)))
              .unwrap()
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          setIsErrorMediaDetail(true);
          toastMessage.error(error || "System is error!");
        })
        .finally(() => setIsLoadingMediaDetail(false));
    }
  };

  useEffect(() => {
    handleTryAgain();
  }, [mediaType, mediaId]);

  useEffect(() => {
    console.log(mediaDetail.credits);
  }, [mediaDetail]);

  const handleDeleteFavorite = (favoriteId: string) => {
    dispatch(deleteFavorite(favoriteId));
  };

  const handleRenderMediaDetail = () => {
    if (isLoadingMediaDetail || isLoading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress size={28} thickness={6} color="error" />
        </Box>
      );
    }

    if (isErrorMediaDetail || isError) {
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Button sx={{ width: "fit-content" }} onClick={handleTryAgain}>
          Try Again
        </Button>
      </Box>;
    }

    if (!mediaDetail) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Typography>No data!</Typography>
        </Box>
      );
    }

    return (
      <Box>
        <BackgroundHeader
          backgroundPath={mediaDetail.backdrop_path || mediaDetail.poster_path}
        />

        <Box
          sx={{
            position: "relative",
            top: {
              xs: "-12rem",
              sm: "-18rem",
              lg: "-24rem",
            },
          }}
        >
          <Stack
            sx={{
              color: "text.primary",
              ...uiConfigs.style.mainContent,
              zIndex: 2,
            }}
          >
            <Stack direction={{ sm: "column", md: "row" }} gap={4}>
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
                    {mediaDetail.original_title || mediaDetail.title}
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  gap={2}
                  justifyContent={{ xs: "center", md: "left" }}
                  alignItems="center"
                >
                  <CircularRate value={mediaDetail.vote_average} />

                  {mediaDetail.genres?.slice(0, 3).map((genre: IGenre) => (
                    <Chip
                      key={genre.id}
                      color="primary"
                      label={genre && genre.name}
                    />
                  ))}
                </Stack>

                <Box>
                  <Typography fontWeight={700}>
                    {mediaDetail.overview}
                  </Typography>
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
                  startIcon={
                    isFavorite ? <Favorite /> : <FavoriteBorderOutlined />
                  }
                />

                <Box>
                  <Container title="Cast">
                    <Box
                      sx={{
                        "& .swiper-slide": {
                          width: {
                            xs: "25%",
                            lg: "20%",
                          },
                        },
                      }}
                    >
                      <Swiper
                        slidesPerView={"auto"}
                        spaceBetween={12}
                        grabCursor={true}
                        style={{ width: "100%", height: "max-content" }}
                        speed={1000}
                      >
                        {castList?.map((item) => (
                          <SwiperSlide key={item.id}>
                            <CardItem
                              mediaType="people"
                              data={item}
                              paddingTop="120%"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </Box>
                  </Container>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Box>
    );
  };

  return <Wrapper>{handleRenderMediaDetail()}</Wrapper>;
}

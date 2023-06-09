import { Delete, PlayArrow } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb_configs";
import uiConfigs from "../../configs/ui_configs";
import { useIsRequestPending } from "../../hooks/use_status";
import { useAppDispatch } from "../../redux_store";
import { deleteFavorite } from "../../redux_store/favorite/favorite_actions";
import { toastMessage } from "../../utils/toast";
import CircularRate from "../circular_rate";

interface IProps {
  mediaType: string;
  data: any;
  paddingTop: string;
  hasDeleteButton?: boolean;
}

export default function CardItem(props: IProps) {
  const { mediaType, data, paddingTop, hasDeleteButton = false } = props;

  const [title, setTitle] = useState<string>("");
  // data.original_title || data.title || data.name
  const [posterPath, setPosterPath] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [rate, setRate] = useState<number>(0);

  const dispatch = useAppDispatch();

  const isLoading = useIsRequestPending("favorite", "deleteFavorite");

  useEffect(() => {
    setTitle(
      data.original_title ||
        data.title ||
        data.original_name ||
        data.name ||
        data.mediaTitle
    );
    setPosterPath(
      tmdbConfigs.posterPath(
        data.poster_path ||
          data.backdrop_path ||
          data.profile_path ||
          data.mediaPoster
      )
    );

    mediaType === tmdbConfigs.mediaType.movie ||
    mediaType === tmdbConfigs.mediaType.tv
      ? setReleaseDate(data.release_date?.split("-")[0])
      : setReleaseDate(data.first_air_date?.split("-")[0]);

    setRate(data.vote_average || data.mediaRate);
  }, [mediaType, data]);

  return (
    <Stack gap={2}>
      <Link
        to={
          mediaType !== "people"
            ? `/${mediaType}/${data.id}`
            : `/person/${data.id}`
        }
      >
        <Box
          sx={{
            ...uiConfigs.style.backgroundImage(posterPath),
            paddingTop,
            "&:hover .media_info": {
              opacity: 1,
              bottom: 0,
            },
            "&:hover .media_backdrop, &:hover .media_play_btn": {
              opacity: 1,
            },
            color: "primary.contrastText",
            borderRadius: "12px",
            border: "1px solid transparent",
            transition: "all .4s ease",
            "&:hover": {
              borderColor: "red",
            },
          }}
        >
          {mediaType !== "people" && (
            <>
              <Box
                className="media_backdrop"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: {
                    xs: 1,
                    md: 0,
                  },
                  transition: "all 0.4s ease",
                  backgroundImage:
                    "linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))",
                  borderRadius: "12px",
                }}
              />
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                className="media_play_btn"
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                  opacity: 0,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  transition: "opacity 0.4s ease",
                  "& .MuiButton-startIcon": {
                    marginX: 0,
                  },
                }}
              />

              <Stack
                className="media_info"
                sx={{
                  gap: 1,
                  position: "absolute",
                  bottom: {
                    xs: 0,
                    md: "-20px",
                  },
                  opacity: {
                    xs: 1,
                    md: 0,
                  },
                  transition: "all 0.4s ease",
                  padding: {
                    xs: 2,
                    md: 2,
                  },
                }}
              >
                {rate && <CircularRate value={rate} />}

                <Box>
                  <Typography>{releaseDate}</Typography>
                </Box>

                <Box>
                  <Typography
                    fontWeight={700}
                    sx={{
                      ...uiConfigs.style.typoLines(1),
                    }}
                  >
                    {title}
                  </Typography>
                </Box>
              </Stack>
            </>
          )}

          {mediaType === "people" && (
            <Box
              sx={{
                position: "absolute",
                left: 0,
                bottom: 0,
                right: 0,
                display: "flex",
                height: "fit-content",
                justifyContent: "center",
                alignItems: "center",
                padding: "12px",
              }}
            >
              <Typography sx={{ ...uiConfigs.style.typoLines(1) }}>
                {title}
              </Typography>
            </Box>
          )}
        </Box>
      </Link>

      {hasDeleteButton && (
        <LoadingButton
          variant="contained"
          sx={{
            width: "100%",
            alignSelf: "center",
            textTransform: "capitalize",
          }}
          startIcon={<Delete />}
          onClick={() =>
            data._id &&
            dispatch(deleteFavorite(data._id))
              .unwrap()
              .then((data) =>
                toastMessage.success(
                  data.message || "Delete favorite successfully!"
                )
              )
              .catch((error) =>
                toastMessage.error(error.message || "Delete favorite failed!")
              )
          }
          loading={isLoading}
        >
          delete
        </LoadingButton>
      )}
    </Stack>
  );
}

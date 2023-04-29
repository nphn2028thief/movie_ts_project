import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux_store";
import tmdbConfigs from "../../../api/configs/tmdb_configs";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import ui from "../../../configs/ui";

interface IProps {
  mediaType: string;
  data: any;
}

export default function MediaItem(props: IProps) {
  const { mediaType, data } = props;

  const { favoriteList } = useAppSelector((state) => state.userSlice);

  const [title, setTitle] = useState<string>("");
  // data.original_title || data.title || data.name
  const [posterPath, setPosterPath] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [rate, setRate] = useState<string>("");

  useEffect(() => {
    setTitle(data.original_title || data.title || data.name);
    setPosterPath(
      tmdbConfigs.posterPath(
        data.poster_path || data.backdrop_path || data.profile_path
      )
    );

    mediaType === tmdbConfigs.mediaType.movie
      ? setReleaseDate(data.release_date?.split("-")[0])
      : setReleaseDate(data.first_air_date?.split("-")[0]);

    setRate(data.vote_average);
  }, [mediaType, data]);

  return (
    <Link
      to={
        mediaType !== "people"
          ? `/${mediaType}/${data.id}`
          : `/person/${data.id}`
      }
    >
      <Box
        sx={{
          ...ui.style.backgroundImage(posterPath),
          paddingTop: "160%",
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
          transition: "all .3s ease",
          "&:hover": {
            borderColor: "red",
          },
        }}
      ></Box>
    </Link>
  );
}

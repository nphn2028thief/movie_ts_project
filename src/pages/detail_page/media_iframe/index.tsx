import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import tmdbConfigs from "../../../api/configs/tmdb_configs";
import mediaApi from "../../../api/http/media_api";
import Container from "../../../components/container";
import uiConfigs from "../../../configs/ui_configs";
import { useAppSelector } from "../../../redux_store";

interface IProps {
  mediaType: string;
  mediaId: number;
}

export default function MediaIframe(props: IProps) {
  const { mediaType, mediaId } = props;

  const { numberOfSeason } = useAppSelector((state) => state.mediaSlice);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [season, setSeason] = useState<number>(1);
  const [episode, setEpisode] = useState<number>(1);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (iframeRef.current?.offsetWidth) {
      const height = (iframeRef.current?.offsetWidth * 9) / 16 + "px";
      iframeRef.current.setAttribute("height", height);
    }
  }, [iframeRef.current?.offsetWidth]);

  useEffect(() => {
    return () => {
      setSeason(1);
      setEpisode(1);
      setEpisodes([]);
      setIsLoading(false);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const getTvEpisode = async () => {
      try {
        const response = await mediaApi.getTvEpisde(mediaId, season);
        setEpisodes(response.data.episodes);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getTvEpisode();
  }, [season]);

  const handleChangeSeason = (i: number) => {
    setSeason(i + 1);
    setEpisode(1);
  };

  const handleRenderIframe = () => {
    if (isLoading) {
      return (
        <>
          <Skeleton variant="rectangular" width="100%" height={500} />
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton variant="text" width="60%" height={40} />
        </>
      );
    }

    return (
      <>
        <Box
          component="iframe"
          ref={iframeRef}
          loading="lazy"
          src={
            mediaType === "movie"
              ? tmdbConfigs.moviePath(mediaId)
              : tmdbConfigs.tvPath(mediaId, season, episode)
          }
          title="Media Official Video"
          width="100%"
          border="none"
          allowFullScreen
        ></Box>

        {numberOfSeason && (
          <Stack gap={2}>
            <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
              <Typography
                component="h5"
                sx={{
                  minWidth: "100px",
                  fontSize: {
                    xs: "1.25rem",
                    sm: "1.5rem",
                  },
                }}
              >
                Seasons
              </Typography>
              {Array.from({ length: numberOfSeason }, (_, index) => {
                return (
                  <Button
                    key={index}
                    variant="outlined"
                    sx={{
                      minWidth: "0 !important",
                      padding: "4px 20px",
                    }}
                    onClick={() => handleChangeSeason(index)}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </Stack>

            <Stack direction="row" gap={2} alignItems="center" flexWrap="wrap">
              <Typography
                component="h5"
                sx={{
                  minWidth: "100px",
                  fontSize: {
                    xs: "1.25rem",
                    sm: "1.5rem",
                  },
                }}
              >
                Episodes
              </Typography>

              {episodes.map((item) => {
                return (
                  <Button
                    key={item.id}
                    variant="outlined"
                    sx={{
                      minWidth: "0 !important",
                      padding: "4px 20px",
                    }}
                    onClick={() => setEpisode(item.episode_number)}
                  >
                    {item.episode_number}
                  </Button>
                );
              })}
            </Stack>
          </Stack>
        )}
      </>
    );
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent, margin: "0 !important" }}>
      <Container
        title={`Official ${mediaType === "movie" ? "Movie" : "Tv Series"}`}
      >
        <Stack gap={3}>{handleRenderIframe()}</Stack>
      </Container>
    </Box>
  );
}

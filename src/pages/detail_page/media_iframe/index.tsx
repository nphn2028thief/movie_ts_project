import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import tmdbConfigs from "../../../api/configs/tmdb_configs";
import Container from "../../../components/container";
import uiConfigs from "../../../configs/ui_configs";

interface IProps {
  mediaType: string;
  mediaId: number;
  numberOfSeason?: number;
}

export default function MediaIframe(props: IProps) {
  const { mediaType, mediaId, numberOfSeason } = props;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current?.offsetWidth) {
      const height = (iframeRef.current?.offsetWidth * 9) / 16 + "px";
      iframeRef.current.setAttribute("height", height);
    }
  }, [iframeRef.current?.offsetWidth]);

  return (
    <Box sx={{ ...uiConfigs.style.mainContent, margin: "0 !important" }}>
      <Container
        title={`Official ${mediaType === "movie" ? "Movie" : "Tv Series"}`}
      >
        <Stack gap={3}>
          <Box
            component="iframe"
            ref={iframeRef}
            src={
              mediaType === "movie"
                ? tmdbConfigs.moviePath(mediaId)
                : tmdbConfigs.tvPath(mediaId, 1, 1)
            }
            title="Media Official Video"
            width="100%"
            border="none"
            allowFullScreen
          ></Box>

          {numberOfSeason && (
            <Stack direction="row" alignItems="center" flexWrap="wrap" gap={2}>
              <Typography
                component="h5"
                sx={{
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
                    variant="outlined"
                    sx={{
                      minWidth: "0 !important",
                      padding: "4px 20px",
                    }}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

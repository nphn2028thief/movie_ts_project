import { PlayArrow } from "@mui/icons-material";
import {
  Box,
  Chip,
  Grow,
  Stack,
  Typography,
  Zoom,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import tmdbConfigs from "../../../api/configs/tmdb_configs";
import uiConfigs from "../../../configs/ui_configs";
import Button from "../../button";
import CircularRate from "../../circular_rate";

interface IProps {
  mediaItem: any;
  genreList: any[];
  isActive: boolean;
}

export default function SlideshowItem(props: IProps) {
  const { mediaItem, genreList, isActive } = props;

  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          ...uiConfigs.style.horizontalGradientBackgroundImage[
            theme.palette.mode
          ],
        }}
      />

      <Box
        sx={{
          paddingTop: {
            xs: "130%",
            sm: "80%",
            md: "60%",
            lg: "44%",
          },
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundImage: `url(${tmdbConfigs.backdropPath(
            mediaItem.backdrop_path || mediaItem.poster_path
          )})`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            maxWidth: "1660px",
            margin: "auto",
            position: "absolute",
            inset: {
              xs: "0",
              sm: "30px",
              md: "40px",
              lg: "70px",
            },
            color: "text.primary",
          }}
        >
          <Stack spacing={4} width="90%">
            <Grow
              in={isActive}
              style={{ transformOrigin: "0 0 0" }}
              {...(isActive ? { timeout: 1500 } : { timeout: 500 })}
            >
              <Box>
                <Typography
                  variant="h2"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "3.8rem" }}
                  fontWeight={700}
                  textAlign={{
                    xs: "center",
                    sm: "left",
                  }}
                  letterSpacing="1px"
                  sx={{ ...uiConfigs.style.typoLines(2) }}
                >
                  {mediaItem.original_title || mediaItem.title}
                </Typography>
              </Box>
            </Grow>

            <Grow
              in={isActive}
              style={{ transformOrigin: "0 0 0" }}
              {...(isActive ? { timeout: 1500 } : { timeout: 500 })}
            >
              <Stack
                direction="row"
                justifyContent={{ xs: "center", sm: "flex-start" }}
                alignItems="center"
                spacing={2}
              >
                <CircularRate value={mediaItem.vote_average} />

                {mediaItem.genre_ids
                  .slice(0, 3)
                  .map((genreId: number, index: number) => {
                    const genreLabel = genreList?.find(
                      (item) => item.id === genreId
                    );

                    return (
                      <Chip
                        key={index}
                        color="primary"
                        label={genreLabel && genreLabel.name}
                      />
                    );
                  })}
              </Stack>
            </Grow>

            <Grow
              in={isActive}
              style={{ transformOrigin: "0 0 0" }}
              {...(isActive ? { timeout: 1500 } : { timeout: 500 })}
            >
              <Box>
                <Typography
                  textAlign={{
                    xs: "center",
                    sm: "left",
                  }}
                  fontWeight={600}
                  letterSpacing="1px"
                  sx={{ ...uiConfigs.style.typoLines(3) }}
                >
                  {mediaItem.overview}
                </Typography>
              </Box>
            </Grow>

            <Grow
              in={isActive}
              style={{ transformOrigin: "0 0 0" }}
              {...(isActive ? { timeout: 1500 } : { timeout: 500 })}
            >
              <Box>
                <Button
                  title="Watch Now"
                  icon={<PlayArrow />}
                  onClick={() => navigate(`/movie/${mediaItem.id}`)}
                />
              </Box>
            </Grow>
          </Stack>

          <Zoom
            in={isActive}
            {...(isActive ? { timeout: 1000 } : { timeout: 500 })}
          >
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
                width: "400px",
                paddingTop: {
                  sm: "50%",
                  md: "40%",
                  lg: "38%",
                },
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundImage: `url(${tmdbConfigs.backdropPath(
                  mediaItem.backdrop_path || mediaItem.poster_path
                )})`,
                borderRadius: "30px",
                boxShadow: "0 7px 29px 0 hsla(240, 5%, 41%, 0.2)",
              }}
            />
          </Zoom>
        </Box>
      </Box>
    </>
  );
}

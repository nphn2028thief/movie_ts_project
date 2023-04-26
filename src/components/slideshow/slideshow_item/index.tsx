import { PlayArrow } from "@mui/icons-material";
import { Box, Grow, Stack, Typography, Zoom, useTheme } from "@mui/material";
import tmdbConfigs from "../../../api/configs/tmdb_configs";
import ui from "../../../configs/ui";
import Button from "../../button";

interface IProps {
  data: any;
  isActive: boolean;
}

export default function SlideshowItem(props: IProps) {
  const { data, isActive } = props;

  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          ...ui.style.horizontalGradientBackgroundImage[theme.palette.mode],
        }}
      />

      <Box
        sx={{
          paddingTop: {
            xs: "130%",
            sm: "80%",
            md: "60%",
            lg: "45%",
          },
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundImage: `url(${tmdbConfigs.backdropPath(
            data.backdrop_path || data.poster_path
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
                  sx={{ ...ui.style.typoLines(2) }}
                >
                  {data.original_title || data.title}
                </Typography>
              </Box>
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
                  sx={{ ...ui.style.typoLines(3) }}
                >
                  {data.overview}
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
                  onClick={() => {}}
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
                  data.backdrop_path || data.poster_path
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

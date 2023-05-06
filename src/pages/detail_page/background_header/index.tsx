import { Box, useTheme } from "@mui/material";
import tmdbConfigs from "../../../api/configs/tmdb_configs";
import uiConfigs from "../../../configs/ui_configs";

interface IProps {
  backgroundPath: string;
}

export default function BackgroundHeader(props: IProps) {
  const { backgroundPath } = props;

  const theme = useTheme();

  return (
    <Box
      sx={{
        zIndex: 1,
        position: "relative",
        paddingTop: {
          xs: "80%",
          sm: "60%",
          md: "40%",
        },
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundImage: `url(${tmdbConfigs.backdropPath(backgroundPath)})`,
        // backgroundAttachment: "fixed",
        "&:before": {
          content: '""',
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          ...uiConfigs.style.gradientBackgroundImage[theme.palette.mode],
          zIndeX: -1,
        },
      }}
    />
  );
}

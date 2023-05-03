import { colors, PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ETHEME } from "../../types/theme_mode";
import components from "./components";

const setMode = (mode: string) => {
  if (mode === ETHEME.dark) {
    return {
      primary: {
        main: "#ff0000",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#f44336",
        contrastText: "#ffffff",
      },
      background: {
        default: "#000000",
        paper: "#131313",
      },
    };
  }

  return {
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#f44336",
    },
    background: {
      default: colors.grey["100"],
    },
  };
};

const themeConfigs = {
  custom: ({ mode }: { mode: PaletteMode }) => {
    const customPalette = setMode(mode);

    return createTheme({
      palette: {
        mode,
        ...customPalette,
      },
      components,
      breakpoints: {
        values: {
          xs: 0,
          sm: 740,
          md: 1024,
          lg: 1200,
          xl: 1536,
        },
      },
    });
  },
};

export default themeConfigs;

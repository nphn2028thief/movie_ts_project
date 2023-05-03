import { Components, ComponentsProps, Theme } from "@mui/material";

type TMuiButton = {
  defaultProps?: ComponentsProps["MuiButton"];
};

const MuiButton: TMuiButton = {
  defaultProps: {
    disableElevation: true,
  },
};

const components: Components<Theme> = {
  MuiButton,

  // MuiCssBaseline: {
  //   styleOverrides: (themeParams) => ({
  //     ":root": {
  //       "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
  //         width: "8px",
  //         borderRadius: 0,
  //       },
  //       "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
  //         borderRadius: "4px",
  //         backgroundColor: themeParams.palette.primary.main,
  //       },
  //       "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
  //         {
  //           backgroundColor: "rgba(255, 0, 0, 0.1)",
  //         },
  //       "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
  //         borderRadius: 0,
  //         backgroundColor: "rgba(0, 0, 0, 0)",
  //       },
  //     },
  //   }),
  // },
};

export default components;

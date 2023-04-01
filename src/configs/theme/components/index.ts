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
};

export default components;

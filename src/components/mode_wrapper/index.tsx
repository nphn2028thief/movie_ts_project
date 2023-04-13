import { useScrollTrigger } from "@mui/material";
import { cloneElement } from "react";
import { useAppSelector } from "../../redux_store";
import { themeMode as themeModeType } from "../../types/theme_mode";

interface IProps {
  window?: () => Window;
  children: JSX.Element;
}

export default function ModeWrapper(props: IProps) {
  const { window, children } = props;
  const { themeMode } = useAppSelector((state) => state.modeSlice);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: trigger
        ? "text.primary"
        : themeMode === themeModeType.dark
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === themeModeType.dark
        ? "background.paper"
        : "primary.contrastText",
    },
  });
}

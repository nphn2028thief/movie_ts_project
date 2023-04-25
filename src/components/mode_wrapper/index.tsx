import { useScrollTrigger } from "@mui/material";
import { cloneElement, useRef } from "react";
import { useAppSelector } from "../../redux_store";
import { ETHEME } from "../../types/theme_mode";

interface IProps {
  window?: () => Window;
  children: JSX.Element;
}

export default function ModeWrapper(props: IProps) {
  const { window, children } = props;
  const { themeMode } = useAppSelector((state) => state.modeSlice);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: trigger
        ? "text.primary"
        : themeMode === ETHEME.dark
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === ETHEME.dark
        ? "background.paper"
        : "primary.contrastText",
    },
  });
}

import { Box } from "@mui/material";
import React from "react";
import ModeWrapper from "../components/mode_wrapper";

interface IProps {
  children: JSX.Element;
}

export default function Wrapper({ children }: IProps) {
  return (
    <ModeWrapper>
      <Box mt={{ xs: 7, md: 8 }} height="100%">
        {children}
      </Box>
    </ModeWrapper>
  );
}

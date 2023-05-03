import { Skeleton } from "@mui/material";
import React, { useEffect } from "react";

interface IProps {
  variant?: "circular" | "rectangular" | "rounded" | "text";
  xsHeight?: number | string;
  smHeight?: number | string;
}

export default function SkeletonLoading(props: IProps) {
  const {
    variant = "rectangular",

    xsHeight = 300,
    smHeight = 400,
  } = props;

  return (
    <>
      <Skeleton
        variant={variant}
        sx={{
          width: {
            xs: "50%",
            sm: "35%",
            md: "25%",
            lg: "20%",
          },
          height: {
            xs: xsHeight,
            sm: smHeight,
          },
        }}
      />
      <Skeleton
        variant={variant}
        sx={{
          width: {
            xs: "50%",
            sm: "35%",
            md: "25%",
            lg: "20%",
          },
          height: {
            xs: xsHeight,
            sm: smHeight,
          },
        }}
      />
      <Skeleton
        variant={variant}
        sx={{
          width: {
            xs: "50%",
            sm: "35%",
            md: "25%",
            lg: "20%",
          },
          height: {
            xs: xsHeight,
            sm: smHeight,
          },
        }}
      />
      <Skeleton
        variant={variant}
        sx={{
          width: {
            xs: "50%",
            sm: "35%",
            md: "25%",
            lg: "20%",
          },
          height: {
            xs: xsHeight,
            sm: smHeight,
          },
        }}
      />
      <Skeleton
        variant={variant}
        sx={{
          width: {
            xs: "50%",
            sm: "35%",
            md: "25%",
            lg: "20%",
          },
          height: {
            xs: xsHeight,
            sm: smHeight,
          },
        }}
      />
    </>
  );
}

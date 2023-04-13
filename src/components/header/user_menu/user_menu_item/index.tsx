import {
  FavoriteBorderOutlined,
  LockResetOutlined,
  RateReviewOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux_store";
import { themeMode } from "../../../../types/theme_mode";
import { themeMode as themeModeType } from "../../../../types/theme_mode";

interface IProps<T> {
  data: T;
}

export default function UserMenuItem<T>({ data }: IProps<T>) {
  const { themeMode } = useAppSelector((state) => state.modeSlice);
  const dispatch = useAppDispatch();

  const getIcons = (icon?: string) => {
    switch (icon) {
      case "LockResetOutlined":
        return <LockResetOutlined fontSize="small" />;
      case "FavoriteBorderOutlined":
        return <FavoriteBorderOutlined fontSize="small" />;
      case "RateReviewOutlined":
        return <RateReviewOutlined fontSize="small" />;
      case "LogoutOutlined":
        return <LogoutOutlined fontSize="small" />;
    }
  };

  const icon = getIcons(data.icon);

  return (
    <>
      {data.isDivider && (
        <Divider
          sx={{
            marginY: 1,
            borderColor:
              themeMode === themeModeType.dark ? "primary.main" : "inherit",
          }}
        />
      )}
      <ListItemButton
        key={data.id}
        sx={{
          minWidth: 180,
          gap: 1,
        }}
        onClick={() => {
          item.path && navigate(data.path);
          setAnchorEl(null);
        }}
      >
        <ListItemIcon sx={{ minWidth: 0 }}>{icon}</ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography>{data.name}</Typography>}
          sx={{ flex: 1 }}
        />
      </ListItemButton>
    </>
  );
}

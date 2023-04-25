import {
  Avatar,
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CUserMenu } from "../../../constants/route_list";
import { useAppDispatch, useAppSelector } from "../../../redux_store";
import LogOutButton from "../../logout_button";

export default function UserMenu() {
  const { userInfo } = useAppSelector((state) => state.authSlice);
  const { themeMode } = useAppSelector((state) => state.modeSlice);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const active = CUserMenu.findIndex((item) => item.path === pathname);

  // const handleGetMe = () => {
  //   if (isLoadingGetMe) {
  //     return (
  //       <Stack
  //         sx={{
  //           flexDirection: "row",
  //           alignItems: "center",
  //           gap: 1,
  //         }}
  //       >
  //         <Skeleton variant="text" width={100} height={32} />
  //         <Skeleton variant="circular" width={32} height={32} />
  //       </Stack>
  //     );
  //   }

  //   return (

  //   );
  // };

  return (
    <>
      <Stack
        sx={{
          display: {
            xs: "none",
            sm: "flex",
          },
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Box>
          <Typography sx={{ userSelect: "none" }}>
            {userInfo?.firstName} {userInfo?.lastName}
            {/* Nhan Nguyen */}
          </Typography>
        </Box>

        <Avatar
          src={userInfo?.image || ""}
          alt="user_avatar"
          sx={{ width: 32, height: 32 }}
        />
      </Stack>

      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { padding: 0, top: "58px !important" } }}
      >
        {CUserMenu.map((item) => {
          const Icon = item.icon;

          return (
            <Stack key={item.id}>
              <ListItemButton
                sx={{
                  minWidth: 180,
                  gap: 1,
                  color: item.id === active + 1 ? "primary.main" : "unset",
                }}
                onClick={() => {
                  item.path && navigate(item.path);
                  setAnchorEl(null);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    color: item.id === active + 1 ? "primary.main" : "unset",
                  }}
                >
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={<Typography>{item.name}</Typography>}
                  sx={{ flex: 1 }}
                />
              </ListItemButton>
            </Stack>
          );
        })}

        <LogOutButton mt={1} />
      </Menu>
    </>
  );
}

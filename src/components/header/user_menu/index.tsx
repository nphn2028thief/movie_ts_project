import {
  Avatar,
  Box,
  Divider,
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
import { setModalIsOpen } from "../../../redux_store/modal/modal_slice";
import { themeMode as themeModeType } from "../../../types/theme_mode";

export default function UserMenu() {
  const { user } = useAppSelector((state) => state.userSlice);
  const { themeMode } = useAppSelector((state) => state.modeSlice);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const active = CUserMenu.findIndex((item) => item.path === pathname);

  return (
    <>
      {user && (
        <>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <Box>
              <Typography sx={{ userSelect: "none" }}>
                {/* {user.firstName} {user.lastName} */}
                Nhan Nguyen
              </Typography>
            </Box>
            <Avatar src="" alt="user_avatar" sx={{ width: 32, height: 32 }} />
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
                <>
                  {item.isDivider && (
                    <Divider
                      sx={{
                        marginY: 1,
                        borderColor:
                          themeMode === themeModeType.dark
                            ? "primary.main"
                            : "inherit",
                      }}
                    />
                  )}
                  <ListItemButton
                    key={item.id}
                    sx={{
                      minWidth: 180,
                      gap: 1,
                      color: item.id === active + 1 ? "primary.main" : "unset",
                    }}
                    onClick={() => {
                      if (item.isDivider && !item.path) {
                        return dispatch(setModalIsOpen(true));
                      }

                      item.path && navigate(item.path);
                      setAnchorEl(null);
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        color:
                          item.id === active + 1 ? "primary.main" : "unset",
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
                </>
              );
            })}
          </Menu>
        </>
      )}
    </>
  );
}

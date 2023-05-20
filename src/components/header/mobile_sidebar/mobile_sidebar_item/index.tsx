import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux_store";
import { setIsOpen } from "../../../../redux_store/mobile_menu/mobile_menu_slice";

import { IMenu } from "../../../../types/route_list";
import { ETHEME } from "../../../../types/theme_mode";
import { handleSwitchTheme } from "../../../../utils/function";
import UserAvatar from "../../../user_avatar";

interface IProps {
  isMobile?: boolean;
  title?: string;
  data?: IMenu[];
  mb?: number;
}

export default function MobileSidebarItem(props: IProps) {
  const { isMobile, title, data, mb } = props;

  const { themeMode } = useAppSelector((state) => state.modeSlice);
  const { userInfo } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const active = data
    ? data.findIndex((item) =>
        item.state ? pathname.includes(item.state) : item.path === pathname
      )
    : 0;

  return (
    <Box
      mb={mb}
      sx={{
        display: isMobile
          ? {
              xs: "block",
              sm: "none",
            }
          : "block",
      }}
    >
      <Box marginBottom="20px">
        {isMobile && userInfo && (
          <Stack spacing={1}>
            <UserAvatar width={64} height={64} />

            <Box>
              <Typography variant="h6">
                {userInfo.firstName} {userInfo.lastName}
              </Typography>
            </Box>
          </Stack>
        )}

        {title && <Typography variant="h6">{title}</Typography>}
      </Box>

      {data ? (
        data.map((item) => {
          const Icon = item.icon;

          const renderBackgroundColor = () => {
            if (item.id === active + 1) {
              return "rgb(178, 0, 0)";
            } else if (themeMode === ETHEME.dark) {
              return "rgba(255, 255, 255, 0.08)";
            } else {
              return "rgba(0, 0, 0, 0.04)";
            }
          };

          return (
            <ListItemButton
              key={item.id}
              sx={{
                borderRadius: "10px",
                marginY: 1,
                backgroundColor:
                  item.id === active + 1 ? "primary.main" : "unset",
                "&:hover": {
                  backgroundColor: renderBackgroundColor(),
                },
              }}
              onClick={() => {
                item.path && navigate(item.path);
                dispatch(setIsOpen(false));
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                <Icon htmlColor={item.id === active + 1 ? "white" : "unset"} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    color={item.id === active + 1 ? "white" : "unset"}
                  >
                    {item.name}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })
      ) : (
        <ListItemButton
          sx={{
            borderRadius: "10px",
            marginY: 1,
          }}
          onClick={() => handleSwitchTheme(themeMode, dispatch)}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
            {themeMode === ETHEME.dark ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography>
                {themeMode === ETHEME.dark ? "Dark Mode" : "Light Mode"}
              </Typography>
            }
          />
        </ListItemButton>
      )}
    </Box>
  );
}

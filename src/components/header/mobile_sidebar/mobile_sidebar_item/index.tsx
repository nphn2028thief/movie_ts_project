import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux_store";
import { setIsOpen } from "../../../../redux_store/mobile_menu/mobile_menu_slice";
import { IItem } from "../../../../types/route_list";
import { themeMode as themeModeType } from "../../../../types/theme_mode";
import { handleSwitchTheme } from "../../../../utils/function";

interface IProps {
  title: string;
  data?: IItem[];
}

export default function MobileSidebarItem(props: IProps) {
  const { title, data } = props;

  const { themeMode } = useAppSelector((state) => state.modeSlice);
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const active = data ? data.findIndex((item) => item.path === pathname) : 0;

  return (
    <>
      <Box marginBottom="20px">
        <Typography variant="h6">{title}</Typography>
      </Box>

      {data ? (
        data.map((item) => {
          const Icon = item.icon;

          const renderBackgroundColor = () => {
            if (item.id === active + 1) {
              return "rgb(178, 0, 0)";
            } else if (themeMode === themeModeType.dark) {
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
              <ListItemIcon>
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
          <ListItemIcon>
            {themeMode === themeModeType.dark ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography>
                {themeMode === themeModeType.dark ? "Dark Mode" : "Light Mode"}
              </Typography>
            }
          />
        </ListItemButton>
      )}
    </>
  );
}

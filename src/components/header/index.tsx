import { DarkModeOutlined, LightModeOutlined, Menu } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Stack, Toolbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { CHeaderItem } from "../../constants/route_list";
import { useAppDispatch, useAppSelector } from "../../redux_store";
import { setModalIsOpen } from "../../redux_store/modal/modal_slice";
import { setThemMode } from "../../redux_store/mode/mode_slice";
import { themeMode as themeModeType } from "../../types/theme_mode";
import Logo from "../logo";
import ModeWrapper from "../mode_wrapper";
import UserMenu from "./user_menu";

export default function Header() {
  const { themeMode } = useAppSelector((state) => state.modeSlice);
  const { user } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  document.title =
    pathname.split("/")[1] === ""
      ? "MoonFlix"
      : `MoonFlix - ${
          pathname.split("/")[1].charAt(0).toUpperCase() +
          pathname.split("/")[1].slice(1).toLowerCase()
        }`;

  const active = CHeaderItem.findIndex((item) => item.path === pathname);

  const handleSwitchTheme = () => {
    const theme =
      themeMode === themeModeType.dark
        ? themeModeType.light
        : themeModeType.dark;
    dispatch(setThemMode(theme));
  };

  return (
    <ModeWrapper>
      <AppBar sx={{ zIndex: 9999 }}>
        <Toolbar
          sx={{
            minHeight: { xs: "56px", md: "64px" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
              position: "relative",
              flex: {
                xs: 1,
                md: 0,
              },
            }}
          >
            <IconButton color="inherit" sx={{ mr: 2, display: { md: "none" } }}>
              <Menu />
            </IconButton>

            <Box
              sx={{
                display: { xs: "inline-block", md: "none" },
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Logo />
            </Box>
          </Stack>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              flex: 1,
            }}
          >
            <Box mr="30px">
              <Logo />
            </Box>

            {CHeaderItem.map((item) => (
              <Button
                key={item.id}
                sx={{
                  minWidth: "71px",
                  color:
                    item.id === active + 1 ? "primary.contrastText" : "inherit",
                  padding: "6px 16px",
                }}
                variant={item.id === active + 1 ? "contained" : "text"}
                onClick={() => {
                  item.path && navigate(item.path);
                }}
              >
                {item.name}
              </Button>
            ))}

            <IconButton color="inherit" onClick={handleSwitchTheme}>
              {themeMode === themeModeType.dark ? (
                <DarkModeOutlined />
              ) : (
                <LightModeOutlined />
              )}
            </IconButton>
          </Box>

          {user ? (
            <UserMenu />
          ) : (
            <Button
              variant="contained"
              sx={{ display: { xs: "none", md: "flex" } }}
              onClick={() => dispatch(setModalIsOpen(true))}
            >
              Log In
            </Button>
          )}
          {/* <UserMenu /> */}
        </Toolbar>
      </AppBar>
    </ModeWrapper>
  );
}

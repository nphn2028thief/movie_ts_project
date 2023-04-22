import { DarkModeOutlined, LightModeOutlined, Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Skeleton,
  Stack,
  Toolbar,
} from "@mui/material";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CHeaderItem } from "../../constants/route_list";
import { useAppDispatch, useAppSelector } from "../../redux_store";
import { setIsOpen } from "../../redux_store/mobile_menu/mobile_menu_slice";
import { setModalIsOpen } from "../../redux_store/modal/modal_slice";
import { ETHEME } from "../../types/theme_mode";
import { handleSwitchTheme } from "../../utils/function";
import AuthModal from "../auth_modal";
import Logo from "../logo";
import ModeWrapper from "../mode_wrapper";
import MobileSidebar from "./mobile_sidebar";
import UserMenu from "./user_menu";
import { getMe } from "../../redux_store/auth/auth_actions";
import { useIsRequestPending } from "../../hooks/use_status";
import LoginButton from "../login_button";

export default function Header() {
  const { themeMode } = useAppSelector((state) => state.modeSlice);
  const { userInfo } = useAppSelector((state) => state.authSlice);
  const { isOpen } = useAppSelector((state) => state.mobileMenuSlice);
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isLoadingGetMe = useIsRequestPending("auth", "getMe");

  document.title =
    pathname.split("/")[1] === ""
      ? "MoonFlix"
      : `MoonFlix - ${
          pathname.split("/")[1].charAt(0).toUpperCase() +
          pathname.split("/")[1].slice(1).toLowerCase()
        }`;

  const active = CHeaderItem.findIndex((item) => item.path === pathname);

  const handleGetMe = () => {
    if (isLoadingGetMe) {
      return (
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Skeleton variant="text" width={100} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
        </Stack>
      );
    } else {
      if (userInfo) {
        return <UserMenu />;
      } else {
        return <LoginButton />;
      }
    }
  };

  const handleToggleMobileMenu = () => {
    dispatch(setIsOpen(!isOpen));
  };

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsOpen(false));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <MobileSidebar />

      <ModeWrapper>
        <AppBar sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{
              minHeight: { xs: "56px", md: "64px" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              color="inherit"
              sx={{ mr: 2, display: { md: "none" } }}
              onClick={handleToggleMobileMenu}
            >
              <Menu />
            </IconButton>

            <Box
              sx={{
                display: { sm: "none" },
                position: {
                  xs: "absolute",
                  sm: "static",
                },
                top: {
                  xs: "50%",
                  sm: 0,
                },
                left: {
                  xs: "50%",
                  sm: 0,
                },
                transform: {
                  xs: "translate(-50%, -50%)",
                  sm: "none",
                },
              }}
            >
              <Logo />
            </Box>

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
                      item.id === active + 1
                        ? "primary.contrastText"
                        : "inherit",
                    padding: "6px 16px",
                  }}
                  variant={item.id === active + 1 ? "contained" : "text"}
                  onClick={() => item.path && navigate(item.path)}
                >
                  {item.name}
                </Button>
              ))}

              <IconButton
                color="inherit"
                onClick={() => handleSwitchTheme(themeMode, dispatch)}
              >
                {themeMode === ETHEME.dark ? (
                  <DarkModeOutlined />
                ) : (
                  <LightModeOutlined />
                )}
              </IconButton>
            </Box>

            {handleGetMe()}
          </Toolbar>
        </AppBar>
      </ModeWrapper>

      <AuthModal />
    </>
  );
}

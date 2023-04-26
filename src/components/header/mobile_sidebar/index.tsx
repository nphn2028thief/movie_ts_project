import { Box, Drawer, List, Toolbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ui from "../../../configs/ui";
import { CHeaderItem, CUserMenu } from "../../../constants/route_list";
import { useAppDispatch, useAppSelector } from "../../../redux_store";
import { setIsOpen } from "../../../redux_store/mobile_menu/mobile_menu_slice";
import { setModalIsOpen } from "../../../redux_store/modal/modal_slice";
import Button from "../../button";
import Logo from "../../logo";
import LogOutButton from "../../logout_button";
import MobileSidebarItem from "./mobile_sidebar_item";

export default function MobileSidebar() {
  const { themeMode } = useAppSelector((state) => state.modeSlice);
  const { userInfo } = useAppSelector((state) => state.authSlice);
  const { isOpen } = useAppSelector((state) => state.mobileMenuSlice);
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // const active = CHeaderItem.findIndex((item) => item.path === pathname);

  const mobileSidebarWidth = ui.style.size.sidebarWidth;

  const renderItemDrawer = () => {
    return (
      <>
        <Toolbar
          sx={{
            justifyContent: "center",
            paddingTop: 3,
            paddingBottom: 3,
            color: "text.primary",
          }}
        >
          <Logo />
        </Toolbar>

        <List sx={{ padding: "8px 30px", overflow: "overlay" }}>
          {userInfo ? (
            <MobileSidebarItem isMobile data={CUserMenu} mb={3} />
          ) : (
            <Box
              mb={3}
              display={{
                xs: "block",
                sm: "none",
              }}
            >
              <Button
                title="Log In"
                width="100%"
                onClick={() => {
                  dispatch(setIsOpen(false));
                  dispatch(setModalIsOpen(true));
                }}
              />
            </Box>
          )}

          <MobileSidebarItem title="Menu" data={CHeaderItem} mb={3} />

          <MobileSidebarItem title="Theme" />

          {userInfo && <LogOutButton isMobile />}
        </List>
      </>
    );
  };

  return (
    <Drawer
      open={isOpen}
      onClose={() => dispatch(setIsOpen(false))}
      sx={{
        ".MuiPaper-root": {
          boxSizing: "border-box",
          width: `${mobileSidebarWidth} !important`,
          borderRight: 0,
        },
      }}
    >
      {renderItemDrawer()}
    </Drawer>
  );
}

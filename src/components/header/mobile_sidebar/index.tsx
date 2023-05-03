import { Box, Drawer, List, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import menuConfigs from "../../../configs/menu_configs";
import uiConfigs from "../../../configs/ui_configs";
import { useAppDispatch, useAppSelector } from "../../../redux_store";
import { setIsOpen } from "../../../redux_store/mobile_menu/mobile_menu_slice";
import { setModalIsOpen } from "../../../redux_store/modal/modal_slice";
import Button from "../../button";
import Logo from "../../logo";
import LogOutButton from "../../logout_button";
import MobileSidebarItem from "./mobile_sidebar_item";

export default function MobileSidebar() {
  const { userInfo } = useAppSelector((state) => state.authSlice);
  const { isOpen } = useAppSelector((state) => state.mobileMenuSlice);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const mobileSidebarWidth = uiConfigs.style.size.sidebarWidth;

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
            <MobileSidebarItem isMobile data={menuConfigs.users} mb={3} />
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

          <MobileSidebarItem title="Menu" data={menuConfigs.main} mb={3} />

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

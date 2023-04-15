import { Drawer, List, Toolbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ui from "../../../configs/ui";
import { CHeaderItem, CUserMenu } from "../../../constants/route_list";
import { useAppDispatch, useAppSelector } from "../../../redux_store";
import { setIsOpen } from "../../../redux_store/mobile_menu/mobile_menu_slice";
import Logo from "../../logo";
import MobileSidebarItem from "./mobile_sidebar_item";

export default function MobileSidebar() {
  const { themeMode } = useAppSelector((state) => state.modeSlice);
  const { user } = useAppSelector((state) => state.userSlice);
  const { isOpen } = useAppSelector((state) => state.mobileMenuSlice);
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const active = CHeaderItem.findIndex((item) => item.path === pathname);

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
          <MobileSidebarItem title="Menu" data={CHeaderItem} />

          {user && <MobileSidebarItem title="Personal Info" data={CUserMenu} />}

          <MobileSidebarItem title="Theme" />
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

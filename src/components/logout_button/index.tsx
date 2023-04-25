import { LogoutOutlined } from "@mui/icons-material";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux_store";
import { logout } from "../../redux_store/auth/auth_slice";
import { setIsOpen } from "../../redux_store/mobile_menu/mobile_menu_slice";
import { ETHEME } from "../../types/theme_mode";

interface IProps {
  isMobile?: boolean;
  mt?: number;
}

export default function LogOutButton(props: IProps) {
  const { isMobile = false, mt } = props;

  const { themeMode } = useAppSelector((state) => state.modeSlice);
  const { isOpen } = useAppSelector((state) => state.modalSlice);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        display: isMobile
          ? {
              xs: "flex",
              sm: "none",
            }
          : "flex",
        marginTop: mt,
      }}
    >
      <Divider
        sx={{
          borderColor: themeMode === ETHEME.dark ? "primary.main" : "inherit",
        }}
      />

      <ListItemButton
        sx={{
          borderRadius: isMobile ? "10px" : 0,
          marginY: mt ? 0 : 1,
          marginTop: mt,
        }}
        onClick={() => {
          dispatch(logout());
          dispatch(setIsOpen(false));
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography>Log Out</Typography>}
        />
      </ListItemButton>
    </Stack>
  );
}

import { Box, Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux_store";
import { setModalIsOpen } from "../../redux_store/modal/modal_slice";
import { ETHEME } from "../../types/theme_mode";
import Logo from "../logo";
import ModeWrapper from "../mode_wrapper";
import LoginForm from "./login_form";
import RegisterForm from "./register_form";
import { ETYPE } from "../../types/auth";
import { useIsRequestPending } from "../../hooks/use_status";

export default function AuthModal() {
  const { isOpen } = useAppSelector((state) => state.modalSlice);
  const { themeMode } = useAppSelector((state) => state.modeSlice);
  const dispatch = useAppDispatch();

  const [type, setType] = useState<ETYPE>(ETYPE.login);

  const isLoadingLogin = useIsRequestPending("auth", "login");

  useEffect(() => {
    if (isOpen) {
      setType(ETYPE.login);
    }
  }, [isOpen]);

  const handleClose = () => {
    dispatch(setModalIsOpen(false));
  };

  const handleSwitchModalType = (state: ETYPE) => {
    setType(state);
    // console.log("haha");
  };

  return (
    <Modal open={isOpen} onClose={isLoadingLogin ? () => {} : handleClose}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: 4,
          outline: "none",
        }}
      >
        <Box
          sx={{
            padding: 4,
            backgroundColor:
              themeMode === ETHEME.dark
                ? "background.paper"
                : "primary.contrastText",
            borderRadius: 1,
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px",
          }}
        >
          <ModeWrapper>
            <Box display="flex" justifyContent="center" mb="2rem">
              <Logo />
            </Box>
          </ModeWrapper>

          {type === ETYPE.login ? (
            <LoginForm
              handleSwitchModalType={() =>
                handleSwitchModalType(ETYPE.register)
              }
            />
          ) : (
            <RegisterForm
              handleSwitchModalType={() => handleSwitchModalType(ETYPE.login)}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
}

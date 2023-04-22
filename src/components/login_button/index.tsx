import { Button } from "@mui/material";
import { useAppDispatch } from "../../redux_store";
import { setIsOpen } from "../../redux_store/mobile_menu/mobile_menu_slice";
import { setModalIsOpen } from "../../redux_store/modal/modal_slice";

interface IProps {
  width?: string;
  isMobile?: boolean;
}

export default function LoginButton(props: IProps) {
  const { width, isMobile } = props;

  const dispatch = useAppDispatch();

  return (
    <Button
      variant="contained"
      sx={{
        display: {
          xs: isMobile ? "flex" : "none",
          sm: isMobile ? "none" : "flex",
        },
        width: width ? width : "auto",
      }}
      onClick={() => {
        dispatch(setIsOpen(false));
        dispatch(setModalIsOpen(true));
      }}
    >
      Log In
    </Button>
  );
}

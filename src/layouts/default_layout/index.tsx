import { Box } from "@mui/material";
import Scrollbars from "react-custom-scrollbars-2";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux_store";
import { getMe } from "../../redux_store/auth/auth_actions";

interface IProps {
  children: JSX.Element;
}

export default function DefaultLayout(props: IProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      dispatch(getMe());
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <Box component="main" sx={{ height: "100vh" }}>
        {props.children}
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

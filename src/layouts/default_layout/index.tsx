import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux_store";
import { getMe } from "../../redux_store/auth/auth_actions";

export default function DefaultLayout() {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      dispatch(getMe());
    }
  }, [dispatch, accessToken]);

  return (
    <>
      <Header />
      <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

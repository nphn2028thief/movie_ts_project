import { Box } from "@mui/material";
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
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      dispatch(getMe());
    }
  }, [dispatch, accessToken]);

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

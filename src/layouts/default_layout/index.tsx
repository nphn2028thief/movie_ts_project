import { Box } from "@mui/material";
import Scrollbars from "react-custom-scrollbars-2";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";

interface IProps {
  children: JSX.Element;
}

export default function DefaultLayout(props: IProps) {
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

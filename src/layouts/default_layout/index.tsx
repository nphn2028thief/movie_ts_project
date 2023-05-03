import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function DefaultLayout() {
  console.log(import.meta.env);

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

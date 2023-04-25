import { ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import theme from "./configs/theme";
import CPath from "./constants/path";
import { useAppSelector } from "./redux_store";
import Routes from "./routes";

const App = () => {
  const { themeMode } = useAppSelector((state) => state.modeSlice);
  const { userInfo } = useAppSelector((state) => state.authSlice);

  const { pathname } = useLocation();

  if (userInfo === null && pathname.startsWith("/me")) {
    // navigate(CPath.home);
    return <Navigate to={CPath.home} replace />;
  }

  return (
    <ThemeProvider theme={theme.custom({ mode: themeMode })}>
      <Routes />
      <Toaster position="top-center" />
    </ThemeProvider>
  );
};

export default App;

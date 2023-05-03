import { ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import themeConfigs from "./configs/theme_configs";
import CPath from "./constants/path";
import { useAppDispatch, useAppSelector } from "./redux_store";
import { getMe } from "./redux_store/auth/auth_actions";
import Routes from "./routes";

const App = () => {
  const { themeMode } = useAppSelector((state) => state.modeSlice);
  const { userInfo } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  if (userInfo === null && pathname.startsWith("/me")) {
    // navigate(CPath.home);
    return <Navigate to={CPath.home} replace />;
  }

  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      <Routes />
      <Toaster position="top-center" />
    </ThemeProvider>
  );
};

export default App;

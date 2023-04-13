import { ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import theme from "./configs/theme";
import { useAppSelector } from "./redux_store";
import Routes from "./routes";

const App = () => {
  const { themeMode } = useAppSelector((state) => state.modeSlice);

  return (
    <ThemeProvider theme={theme.custom({ mode: themeMode })}>
      <Routes />
      <Toaster position="top-center" />
    </ThemeProvider>
  );
};

export default App;

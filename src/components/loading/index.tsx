import { Box, LinearProgress, Paper, Toolbar } from "@mui/material";
import Logo from "../logo";

export default function Loading() {
  return (
    <Paper
      sx={{
        opacity: 1,
        pointerEvents: "none",
        transition: "all 0.3s ease",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 999,
      }}
    >
      <Toolbar />
      <LinearProgress />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Logo />
      </Box>
    </Paper>
  );
}

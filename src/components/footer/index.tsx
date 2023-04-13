import { Box } from "@mui/material";
import footerImg from "../../assets/footer_bg.jpg";
import Logo from "../logo";

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "372px",
        height: "100%",
        backgroundImage: `url(${footerImg})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Logo color="#fff" />
    </Box>
  );
}

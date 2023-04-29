import { Box } from "@mui/material";
import footerImg from "../../assets/footer_bg.jpg";
import Logo from "../logo";

export default function Footer() {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${footerImg})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        paddingTop: {
          xs: "60%",
          md: "50%",
          lg: "32%",
        },
      }}
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{ transform: "translate(-50%, -50%)" }}
      >
        <Logo color="#fff" />
      </Box>
    </Box>
  );
}

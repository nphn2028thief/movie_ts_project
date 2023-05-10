import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import CPath from "../../constants/path";

interface IProps {
  color?: string;
}

export default function Logo({ color }: IProps) {
  const theme = useTheme();

  return (
    <Link to={CPath.home}>
      <Stack direction="row" alignItems="center">
        <Box>
          <Typography variant="h4" fontWeight="700" color={color && "#fff"}>
            Moon
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.primary.main,
            }}
          >
            Flix
          </Typography>
        </Box>
      </Stack>
    </Link>
  );
}

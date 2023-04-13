import { Box, Stack, Typography, useTheme } from "@mui/material";

interface IProps {
  color?: string;
}

export default function Logo({ color }: IProps) {
  const theme = useTheme();

  return (
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
  );
}

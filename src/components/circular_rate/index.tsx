import { Box, CircularProgress, Typography } from "@mui/material";

interface IProps {
  value: number;
}

export default function CircularRate(props: IProps) {
  const { value } = props;

  return (
    <Box
      sx={{
        display: "inline-flex",
        width: "max-content",
        position: "relative",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={value * 10}
        color="success"
        size={40}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="caption" fontWeight={700}>
          {Math.floor(value * 10) / 10}
        </Typography>
      </Box>
    </Box>
  );
}

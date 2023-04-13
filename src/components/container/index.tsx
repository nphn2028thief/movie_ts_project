import { Box, Stack, Typography } from "@mui/material";

interface IProps {
  title: string;
  children: JSX.Element;
}

export default function Title(props: IProps) {
  return (
    <Box
      sx={{
        marginTop: "5rem",
        marginX: "auto",
        color: "text.primary",
      }}
    >
      <Stack spacing={4}>
        {props.title && (
          <Box
            sx={{
              position: "relative",
              maxWidth: "1366px",
              width: "100%",
              paddingX: { xs: "20px", md: 0 },
              marginX: "auto",
              "&::before": {
                content: "",
                position: "absolute",
                left: { xs: "20px", md: 0 },
                top: 0,
                width: "100px",
                height: "4px",
                backgroundColor: "primary.main",
              },
            }}
          >
            <Typography variant="h5" fontWeight="700" textTransform="uppercase">
              {props.title}
            </Typography>
          </Box>
        )}
        {props.children}
      </Stack>
    </Box>
  );
}

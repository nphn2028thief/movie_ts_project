import { Box, Button, Stack, Typography } from "@mui/material";
import uiConfigs from "../../configs/ui_configs";

interface IProps {
  title: string;
  hasButton?: boolean;
  children: JSX.Element;
}

export default function Container(props: IProps) {
  const { title, hasButton = false, children } = props;

  return (
    <Stack spacing={4} color="text.primary">
      <Stack
        direction="row"
        justifyContent={title ? "space-between" : "flex-end"}
      >
        <Box
          sx={{
            position: "relative",
            maxWidth: uiConfigs.style.size.contentMaxWidth,
            width: "max-content",
            "&:before": {
              content: '""',
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100px",
              height: 4,
              backgroundColor: "primary.main",
            },
          }}
        >
          <Typography
            variant="h6"
            fontSize={{
              xs: "1.25rem",
              md: "1.5rem",
            }}
            fontWeight={700}
            textTransform="capitalize"
          >
            {title}
          </Typography>
        </Box>

        {hasButton && (
          <Button variant="outlined" sx={{ letterSpacing: 2 }}>
            Watch more
          </Button>
        )}
      </Stack>
      {children}
    </Stack>
  );
}

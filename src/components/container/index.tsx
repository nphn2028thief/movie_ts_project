import { Box, Button, Stack, Typography } from "@mui/material";
import ui from "../../configs/ui";

interface IProps {
  title: string;
  children: JSX.Element;
}

export default function Container(props: IProps) {
  const { title, children } = props;

  return (
    <Box
      sx={{
        marginTop: "5rem",
        paddingX: {
          xs: 2,
          sm: 3,
        },
        color: "text.primary",
      }}
    >
      <Stack spacing={4}>
        <Stack direction="row" justifyContent="space-between">
          <Box
            sx={{
              position: "relative",
              maxWidth: ui.style.size.contentMaxWidth,
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
              fontWeight={700}
              textTransform="capitalize"
            >
              {title}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              letterSpacing: 2,
            }}
          >
            watch more
          </Button>
        </Stack>
        {children}
      </Stack>
    </Box>
  );
}

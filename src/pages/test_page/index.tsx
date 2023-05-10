import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Wrapper from "../wrapper";

import "swiper/css";
import "swiper/css/pagination";
import uiConfigs from "../../configs/ui_configs";
import { Image, Send } from "@mui/icons-material";

export default function TestPage() {
  return (
    <Wrapper>
      {/* <Stack direction="row" gap={2}>
        {Array.from({ length: 200 }, (_, index) => {
          return (
            <Button
              variant="outlined"
              sx={{
                minWidth: "0 !important",
                padding: "4px 20px",
              }}
              onClick={() => console.log(index + 1)}
            >
              {index + 1}
            </Button>
          );
        })}
      </Stack> */}
      <Box sx={{ ...uiConfigs.style.mainContent, margin: "0 !important" }}>
        <Box
          sx={{
            position: "relative",
            maxWidth: uiConfigs.style.size.contentMaxWidth,
            width: "max-content",
            marginBottom: 3,
            "&:before": {
              content: '""',
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "70%",
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
            Reviews
          </Typography>
        </Box>

        {/* <Button
          variant="contained"
          sx={{
            width: "fit-content",
            textTransform: "uppercase",
            marginBottom: 1,
          }}
        >
          log in to comment
        </Button> */}

        <Stack direction="row" gap={3} marginBottom={3}>
          <Avatar>
            <Image />
          </Avatar>

          <Stack flex={1} gap={2}>
            <Box>
              <Typography variant="h6">Title</Typography>
            </Box>
            <Box>
              <TextField
                variant="outlined"
                multiline
                rows={4}
                placeholder="Write you comment"
                sx={{ width: "100%" }}
              />
            </Box>
            <Box textAlign="end">
              <Button
                variant="contained"
                sx={{
                  width: "fit-content",
                  textTransform: "uppercase",
                }}
                startIcon={<Send />}
              >
                post
              </Button>
            </Box>
          </Stack>
        </Stack>

        <Divider sx={{ backgroundColor: "primary.main", marginY: 3 }} />

        <Stack direction="row" gap={3} padding={2} borderRadius="4px">
          <Avatar>
            <Image />
          </Avatar>

          <Stack flex={1} gap={2}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Box>
                <Typography variant="h6" sx={{ userSelect: "none" }}>
                  Title
                </Typography>
              </Box>

              <Divider orientation="vertical" />

              <Box>
                <Typography variant="body2" sx={{ userSelect: "none" }}>
                  Time
                </Typography>
              </Box>
            </Stack>
            <Box>
              <Typography>Comment</Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Wrapper>
  );
}

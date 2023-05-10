import { Image, Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import uiConfigs from "../../../configs/ui_configs";
import { useAppDispatch, useAppSelector } from "../../../redux_store";
import { setModalIsOpen } from "../../../redux_store/modal/modal_slice";

export default function Review() {
  const { userInfo } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  return (
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

      {userInfo ? (
        <>
          <Stack direction="row" gap={3} marginBottom={3}>
            <Avatar src={userInfo.image || ""} alt="avatar" />

            <Stack flex={1} gap={2}>
              <Box>
                <Typography variant="h6">
                  {userInfo.firstName} {userInfo.lastName}
                </Typography>
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
        </>
      ) : (
        <Button
          variant="contained"
          sx={{
            width: "fit-content",
            textTransform: "uppercase",
            marginBottom: 2,
          }}
          onClick={() => dispatch(setModalIsOpen(true))}
        >
          log in to comment
        </Button>
      )}

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
  );
}

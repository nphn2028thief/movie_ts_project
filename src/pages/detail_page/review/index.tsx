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
import { useEffect, useRef, useState } from "react";
import { resetReview } from "../../../redux_store/review/review_slice";
import {
  addReview,
  getReviewsByMedia,
} from "../../../redux_store/review/review_actions";
import dayjs from "dayjs";

interface IProps {
  mediaType: string;
  mediaId: string;
}

export default function Review(props: IProps) {
  const { mediaType, mediaId } = props;

  const { userInfo } = useAppSelector((state) => state.authSlice);
  const { mediaDetail } = useAppSelector((state) => state.mediaSlice);
  const { reviewList } = useAppSelector((state) => state.reviewSlice);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      dispatch(resetReview());
    };
  }, []);

  useEffect(() => {
    dispatch(getReviewsByMedia({ mediaType, mediaId }));
  }, []);

  const handleSubmit = () => {
    if (!value.trim()) {
      inputRef.current?.focus();
      return;
    }

    dispatch(
      addReview({
        mediaType,
        mediaId,
        mediaTitle:
          mediaDetail.original_title ||
          mediaDetail.title ||
          mediaDetail.original_name ||
          mediaDetail.name,
        mediaPoster: mediaDetail.poster_path || mediaDetail.backdrop_path,
        content: value,
      })
    )
      .unwrap()
      .then(() => setValue(""));
  };

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
                  inputRef={inputRef}
                  variant="outlined"
                  value={value}
                  multiline
                  rows={4}
                  placeholder="Write you comment"
                  sx={{ width: "100%" }}
                  onChange={(e) => setValue(e.target.value)}
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
                  onClick={handleSubmit}
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

      {reviewList.map((item) => (
        <Stack direction="row" gap={3} padding={2} borderRadius="4px">
          <Avatar>
            <Image />
          </Avatar>

          <Stack flex={1} gap={2}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Box>
                <Typography variant="h6" sx={{ userSelect: "none" }}>
                  {item.account.firstName} {item.account.lastName}
                </Typography>
              </Box>

              <Divider orientation="vertical" />

              <Box>
                <Typography variant="body2" sx={{ userSelect: "none" }}>
                  {dayjs(item.createAt).format("DD-MM-YYYY HH:mm:ss")}
                </Typography>
              </Box>
            </Stack>
            <Box>
              <Typography>{item.content}</Typography>
            </Box>
          </Stack>
        </Stack>
      ))}
    </Box>
  );
}

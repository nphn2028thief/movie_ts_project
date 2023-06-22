import { LoadingButton } from "@mui/lab";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CardItem from "../../components/card_item";
import PageGrid from "../../components/page_grid";
import uiConfigs from "../../configs/ui_configs";
import useDebounced from "../../hooks/use_debounced";
import usePrevious from "../../hooks/use_previous";
import { useGetStatus } from "../../hooks/use_status";
import { useAppDispatch, useAppSelector } from "../../redux_store";
import { searchMedia } from "../../redux_store/media/media_actions";
import { resetMediaList, setPage } from "../../redux_store/media/media_slice";
import searchCategories from "../../utils/search_header";
import { toastMessage } from "../../utils/toast";
import Wrapper from "../wrapper";

export default function SearchPage() {
  const [type, setType] = useState<string>(searchCategories[0].type);
  const [searchValue, setSearchValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const debouncedValue = useDebounced(searchValue, 500);

  const prevType = usePrevious(type);

  const { media } = useAppSelector((state) => state.mediaSlice);
  const dispatch = useAppDispatch();

  const [isLoading, isError] = useGetStatus("media", "searchMedia");

  useEffect(() => {
    return () => {
      setType(searchCategories[0].type);
      dispatch(resetMediaList());
    };
  }, []);

  useEffect(() => {
    if (type !== prevType) {
      let mediaType: string = "";

      if (type === "movie") {
        mediaType = searchCategories[0].type;
      } else if (type === "tv") {
        mediaType = searchCategories[1].type;
      } else {
        mediaType = searchCategories[2].type;
      }

      setType(mediaType);
      dispatch(setPage(1));
    }
  }, [type, prevType]);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      dispatch(resetMediaList());
      return;
    }

    dispatch(
      searchMedia({
        mediaType: type,
        keyword: debouncedValue,
        page: media.page,
      })
    )
      .unwrap()
      .catch((error) =>
        toastMessage.error(error.message || "System is error!")
      );
  }, [debouncedValue, media.page]);

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value;

    if (!inputValue.startsWith(" ")) {
      setSearchValue(inputValue);
    }
  };

  const handleChangeCategory = (mediaType: string) => {
    if (type === mediaType) {
      return;
    }

    setSearchValue("");
    setType(mediaType);
    dispatch(setPage(1));
  };

  return (
    <Wrapper>
      <Stack
        gap={2}
        minHeight={{
          xs: "calc(100vh - 88px)",
          md: "calc(100vh - 96px)",
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
          mt={4}
        >
          {searchCategories.map((item) => (
            <Button
              key={item.id}
              variant={type === item.type ? "contained" : "text"}
              sx={{ textTransform: "uppercase", padding: "6px 16px" }}
              onClick={() => handleChangeCategory(item.type)}
            >
              {item.type === "person" ? "people" : item.type}
            </Button>
          ))}
        </Stack>

        <Box
          sx={{
            ...uiConfigs.style.mainContent,
            margin: "0 !important",
          }}
        >
          <Box position="relative">
            <TextField
              inputRef={inputRef}
              size="small"
              fullWidth
              sx={{
                "& input": {
                  paddingRight: "46px",
                },
              }}
              value={searchValue}
              placeholder="Search here..."
              onChange={(e) => handleChangeValue(e)}
            />

            {isLoading && (
              <Box
                display="flex"
                position="absolute"
                right={12}
                top="50%"
                sx={{ transform: "translateY(-50%)" }}
              >
                <CircularProgress size={20} color="error" />
              </Box>
            )}
          </Box>
        </Box>

        <PageGrid>
          {media.data.map((item, index) => (
            <Box key={index}>
              <CardItem mediaType={type} data={item} paddingTop="160%" />
            </Box>
          ))}
        </PageGrid>

        {media.data && media.page < media.totalPages && (
          <LoadingButton
            variant="outlined"
            sx={{
              width: "30%",
              alignSelf: "center",
              textTransform: "capitalize",
              mt: 3,
            }}
            onClick={() => dispatch(setPage(media.page + 1))}
            loading={isLoading}
          >
            load more
          </LoadingButton>
        )}
      </Stack>
    </Wrapper>
  );
}

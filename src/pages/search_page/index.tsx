import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import Wrapper from "../wrapper";
import searchCategories from "../../utils/search_header";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux_store";
import { useGetStatus } from "../../hooks/use_status";
import uiConfigs from "../../configs/ui_configs";

export default function SearchPage() {
  const [category, setCategory] = useState<string>(
    searchCategories[0].category
  );

  const { media } = useAppSelector((state) => state.mediaSlice);
  const dispatch = useAppDispatch();

  const [isLoading, isError] = useGetStatus("media", "getMediaList");

  return (
    <Wrapper>
      <Stack gap={2}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
          mt={4}
        >
          {searchCategories.map((item) => (
            <Button
              variant={category === item.category ? "contained" : "text"}
              sx={{ textTransform: "uppercase", padding: "6px 16px" }}
              onClick={() => setCategory(item.category)}
            >
              {item.category === "person" ? "people" : item.category}
            </Button>
          ))}
        </Stack>

        <Box
          sx={{
            position: "relative",
            ...uiConfigs.style.mainContent,
            margin: "0 !important",
          }}
        >
          <TextField size="small" fullWidth placeholder="Search here..." />

          <Box
            display="flex"
            position="absolute"
            right={2}
            top="50%"
            sx={{ transform: "translateY(-50%)" }}
          >
            <CircularProgress size={20} color="error" />
          </Box>
        </Box>
      </Stack>
    </Wrapper>
  );
}

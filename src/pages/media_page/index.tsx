import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import mediaApi from "../../api/http/media_api";
import CardItem from "../../components/card_item";
import usePrevious from "../../hooks/use_previous";
import { IMediaResult } from "../../types/media";
import {
  IMediaHeader,
  movieCategories,
  tvCategories,
} from "../../utils/media_header";
import { toastMessage } from "../../utils/toast";
import Wrapper from "../wrapper";
import TryAgainButton from "../../components/try_again_button";

export default function MediaPage() {
  const { mediaType } = useParams();

  const [medias, setMedias] = useState<IMediaResult[]>([]);
  const [currentCategory, setCurrentCategory] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const prevMediaType = usePrevious(String(mediaType));

  useEffect(() => {
    return () => {
      setMedias([]);
      setCurrentCategory(1);
      setPage(1);
      setTotalPages(0);
      setIsLoading(false);
      setIsError(false);
    };
  }, []);

  const handleGetMedias = async () => {
    setIsError(false);
    setIsLoading(true);

    const category =
      mediaType === "movie"
        ? movieCategories[currentCategory - 1].category
        : tvCategories[currentCategory - 1].category;

    try {
      const response = await mediaApi.getMediaList({
        mediaType: String(mediaType),
        mediaCategory: category,
        page,
      });

      setTotalPages(response.data.total_pages);

      if (page !== 1) {
        setMedias((prev) => [...prev, ...response.data.results]);
      } else {
        setMedias([...response.data.results]);
      }

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setIsError(true);
      toastMessage.error(error.message || "System is error!");
    }
  };

  useEffect(() => {
    if (mediaType !== prevMediaType) {
      setCurrentCategory(1);
      setPage(1);
    }
  }, [mediaType, prevMediaType]);

  useEffect(() => {
    handleGetMedias();
  }, [mediaType, currentCategory, page, prevMediaType]);

  const handleChangeCategory = (id: number) => {
    if (currentCategory === id) return;
    setCurrentCategory(id);
    setPage(1);
  };

  const handleRenderHeader = () => {
    let array: IMediaHeader[] = [];

    if (mediaType === "movie") {
      array.push(...movieCategories);
    } else if (mediaType === "tv") {
      array.push(...tvCategories);
    }

    return array.map((item) => (
      <Button
        key={item.id}
        variant={currentCategory === item.id ? "contained" : "text"}
        sx={{
          color:
            currentCategory === item.id
              ? "primary.contrastText"
              : "text.primary",

          padding: "6px 16px",
        }}
        onClick={() => handleChangeCategory(item.id)}
      >
        {item.name}
      </Button>
    ));
  };

  const handleRenderCardItem = () => {
    if (isError) {
      return <TryAgainButton onClick={handleGetMedias} />;
    }

    return (
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr 1fr",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={2}
        paddingX={{
          xs: 2,
          sm: 3,
        }}
      >
        {medias.map((item, index) => (
          <Box key={index}>
            <CardItem
              mediaType={String(mediaType)}
              data={item}
              paddingTop="160%"
            />
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Wrapper>
      <Stack gap={4}>
        {/* Header */}
        <Box
          display={{
            xs: "grid",
            sm: "flex",
          }}
          gridTemplateColumns="1fr 1fr"
          justifyContent={{
            xs: "center",
            md: "flex-end",
          }}
          alignItems="center"
          gap={2}
          mt={4}
          paddingX={3}
        >
          {handleRenderHeader()}
        </Box>

        {/* Card */}
        {handleRenderCardItem()}

        {page < totalPages && (
          <LoadingButton
            variant="outlined"
            sx={{
              width: "30%",
              alignSelf: "center",
              textTransform: "capitalize",
              mt: 3,
            }}
            onClick={() => setPage(page + 1)}
            loading={isLoading}
          >
            load more
          </LoadingButton>
        )}
      </Stack>
    </Wrapper>
  );
}

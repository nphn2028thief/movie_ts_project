import { Box, Stack } from "@mui/material";
import tmdbConfigs from "../../api/configs/tmdb_configs";
import Container from "../../components/container";
import Wrapper from "../wrapper";
import MediaSection from "./media_section";
import Slideshow from "./slideshow";

interface IMediaSlide {
  id: number;
  title: string;
  type: string;
  category: string;
}

const mediaSlides: IMediaSlide[] = [
  {
    id: 1,
    title: "popular movies",
    type: tmdbConfigs.mediaType.movie,
    category: tmdbConfigs.mediaCategory.popular,
  },
  {
    id: 2,
    title: "top rated movies",
    type: tmdbConfigs.mediaType.movie,
    category: tmdbConfigs.mediaCategory.top_rated,
  },
  {
    id: 3,
    title: "popular series",
    type: tmdbConfigs.mediaType.tv,
    category: tmdbConfigs.mediaCategory.popular,
  },
  {
    id: 4,
    title: "top rated series",
    type: tmdbConfigs.mediaType.tv,
    category: tmdbConfigs.mediaCategory.top_rated,
  },
];

export default function HomePage() {
  return (
    <Wrapper>
      <Stack>
        <Slideshow
          mediaType={tmdbConfigs.mediaType.movie}
          mediaCategory={tmdbConfigs.mediaCategory.popular}
        />

        <Box>
          {mediaSlides.map((mediaSlide) => (
            <Container key={mediaSlide.id} title={mediaSlide.title}>
              <MediaSection
                mediaType={mediaSlide.type}
                mediaCategory={mediaSlide.category}
              />
            </Container>
          ))}
        </Box>
      </Stack>
    </Wrapper>
  );
}
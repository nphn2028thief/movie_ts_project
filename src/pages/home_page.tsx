import { Box } from "@mui/material";
import Wrapper from "./wrapper";
import Slideshow from "../components/slideshow";
import tmdbConfigs from "../api/configs/tmdb_configs";

export default function HomePage() {
  return (
    <Wrapper>
      <Slideshow
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
      {/* <Box>Hello</Box> */}
    </Wrapper>
  );
}

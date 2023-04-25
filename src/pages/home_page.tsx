import { Box } from "@mui/material";
import Wrapper from "./wrapper";
import Slide from "../components/Slide";
import tmdbConfigs from "../api/configs/tmdb_configs";

export default function HomePage() {
  return (
    <Wrapper>
      <Slide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
    </Wrapper>
  );
}

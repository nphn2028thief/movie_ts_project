import { Box, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Wrapper from "./wrapper";

export default function MediaPage() {
  const { mediaType } = useParams();

  return (
    <Wrapper>
      <Box>
        <Typography>Media Page</Typography>

        <Link to="/movie/12345">movie detail nè</Link>
        <Link to="/tv/12345">tv nè</Link>
      </Box>
    </Wrapper>
  );
}

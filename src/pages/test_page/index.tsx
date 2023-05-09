import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import Wrapper from "../wrapper";

import "swiper/css";
import "swiper/css/pagination";

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
      <Stack gap={3}>
        <Skeleton variant="rectangular" width="100%" height={500} />
        <Skeleton variant="text" width="60%" height={40} />
        <Skeleton variant="text" width="60%" height={40} />
      </Stack>
    </Wrapper>
  );
}

import React from "react";
import Wrapper from "../wrapper";
import { Stack, Button } from "@mui/material";

export default function TestPage() {
  //   const handleRenderButton = () => {
  //     Array.from({ length: 10 }, (_, index) => {
  //       <Button variant="outlined">{index}</Button>;
  //     });
  //   };

  return (
    <Wrapper>
      <Stack direction="row" flexWrap="wrap" gap={2}>
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
      </Stack>
    </Wrapper>
  );
}

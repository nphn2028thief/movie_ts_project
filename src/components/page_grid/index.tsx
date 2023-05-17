import { Box } from "@mui/material";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function PageGrid(props: IProps) {
  const { children } = props;

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
      {children}
    </Box>
  );
}

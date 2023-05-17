import { Box } from "@mui/material";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function PageHeaderGrid(props: IProps) {
  const { children } = props;

  return (
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
      {children}
    </Box>
  );
}

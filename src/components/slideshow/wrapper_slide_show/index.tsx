import { Box } from "@mui/material";

interface IProps {
  children: JSX.Element;
}

export default function WrapperSlideshow(props: IProps) {
  const { children } = props;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={{
        xs: "calc(100vh - 56px)",
        md: "calc(100vh - 64px)",
      }}
    >
      {children}
    </Box>
  );
}
